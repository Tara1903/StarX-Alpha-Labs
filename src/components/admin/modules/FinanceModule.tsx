"use client";

import React, { useState, useEffect } from "react";
import {
  Banknote,
  Receipt,
  FileText,
  FileCheck2,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Building,
  Calendar,
  CreditCard,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  X,
  Send,
  Eye,
  FileSpreadsheet,
  Settings,
} from "lucide-react";
import type {
  Invoice,
  Quotation,
  Contract,
  PaymentRecord,
  Expense,
  FinanceOverviewStats,
  AgingBucket,
  FinanceSettings,
} from "@/types/finance";

export function FinanceModule({ defaultSubTab = "overview" }: { defaultSubTab?: string }) {
  const [subTab, setSubTab] = useState<
    "overview" | "quotations" | "contracts" | "invoices" | "payments" | "expenses" | "reports" | "settings"
  >(defaultSubTab as any);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<FinanceOverviewStats | null>(null);
  const [aging, setAging] = useState<AgingBucket | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);

  // Modals
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  // Selected item for preview
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [previewQuote, setPreviewQuote] = useState<Quotation | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadFinanceData = async () => {
    setLoading(true);
    try {
      const [overviewRes, quotesRes, invsRes, paysRes, contsRes, expsRes, settsRes] =
        await Promise.all([
          fetch("/api/admin/finance/overview"),
          fetch("/api/admin/finance/quotations"),
          fetch("/api/admin/finance/invoices"),
          fetch("/api/admin/finance/payments"),
          fetch("/api/admin/finance/contracts"),
          fetch("/api/admin/finance/expenses"),
          fetch("/api/admin/finance/settings"),
        ]);

      if (overviewRes.ok) {
        const json = await overviewRes.json();
        setStats(json.stats);
        setAging(json.agingBuckets);
      }
      if (quotesRes.ok) {
        const json = await quotesRes.json();
        setQuotations(json.quotations || []);
      }
      if (invsRes.ok) {
        const json = await invsRes.json();
        setInvoices(json.invoices || []);
      }
      if (paysRes.ok) {
        const json = await paysRes.json();
        setPayments(json.payments || []);
      }
      if (contsRes.ok) {
        const json = await contsRes.json();
        setContracts(json.contracts || []);
      }
      if (expsRes.ok) {
        const json = await expsRes.json();
        setExpenses(json.expenses || []);
      }
      if (settsRes.ok) {
        const json = await settsRes.json();
        setSettings(json.settings);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinanceData();
  }, []);

  // Format currency helper
  const fmt = (amount: number, curr = "INR") => {
    if (curr === "INR") {
      return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-500/90 text-white font-mono text-xs shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Sub-Nav */}
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30 mb-2">
              <Banknote className="w-3 h-3" />
              <span>Phase 10 • Commercial &amp; Financial Management</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Commercial Operations &amp; Ledger</h2>
            <p className="text-xs text-slate-300">
              Centralized financial record-keeping, offline payment tracking, client invoices, and quotations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>New Quote</span>
            </button>
            <button
              onClick={() => setInvoiceModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Invoice</span>
            </button>
            <button
              onClick={() => setPaymentModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-[#030B24] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-lg shadow-[#087BFF]/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1 border-t border-white/10 pt-4 overflow-x-auto text-xs font-mono">
          {[
            { id: "overview", label: "Executive Overview", icon: TrendingUp },
            { id: "quotations", label: `Quotations (${quotations.length})`, icon: FileText },
            { id: "contracts", label: `Contracts (${contracts.length})`, icon: FileCheck2 },
            { id: "invoices", label: `Invoices (${invoices.length})`, icon: Receipt },
            { id: "payments", label: `Payments (${payments.length})`, icon: Banknote },
            { id: "expenses", label: `Expenses (${expenses.length})`, icon: CreditCard },
            { id: "reports", label: "Reports & CSV", icon: FileSpreadsheet },
            { id: "settings", label: "Finance Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? "bg-[#087BFF] text-white font-bold shadow-md shadow-[#087BFF]/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: EXECUTIVE OVERVIEW */}
      {subTab === "overview" && (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Total Invoiced</span>
              <p className="text-xl font-extrabold text-white">{fmt(stats?.totalInvoiced || 0)}</p>
              <p className="text-[10px] text-slate-400">{stats?.invoiceCounts.total || 0} Invoices Issued</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#071638] border border-emerald-500/20 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase">Total Collected</span>
              <p className="text-xl font-extrabold text-emerald-300">{fmt(stats?.totalCollected || 0)}</p>
              <p className="text-[10px] text-emerald-400/80">{stats?.invoiceCounts.paid || 0} Fully Paid Invoices</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#071638] border border-amber-500/20 space-y-1">
              <span className="text-[11px] font-mono text-amber-400 uppercase">Outstanding Balance</span>
              <p className="text-xl font-extrabold text-amber-300">{fmt(stats?.totalOutstanding || 0)}</p>
              <p className="text-[10px] text-amber-400/80">{stats?.invoiceCounts.partiallyPaid || 0} Partially Paid</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#071638] border border-rose-500/20 space-y-1">
              <span className="text-[11px] font-mono text-rose-400 uppercase">Overdue Receivables</span>
              <p className="text-xl font-extrabold text-rose-300">{fmt(stats?.totalOverdue || 0)}</p>
              <p className="text-[10px] text-rose-400/80">{stats?.invoiceCounts.overdue || 0} Overdue Invoices</p>
            </div>
          </div>

          {/* Aging Report Breakdown & Operational Cashflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Receivables Aging */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Receivables Aging Analysis</h3>
                  <p className="text-xs text-slate-400">Aging distribution of outstanding client payments</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">
                  Strict Server Date Math
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Not Yet Due</span>
                  <p className="text-sm font-bold text-white">{fmt(aging?.notYetDue || 0)}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">1–30 Days</span>
                  <p className="text-sm font-bold text-white">{fmt(aging?.days1To30 || 0)}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">31–60 Days</span>
                  <p className="text-sm font-bold text-white">{fmt(aging?.days31To60 || 0)}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-orange-400 uppercase">61–90 Days</span>
                  <p className="text-sm font-bold text-white">{fmt(aging?.days61To90 || 0)}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-rose-500/20 space-y-1">
                  <span className="text-[10px] font-mono text-rose-400 uppercase">90+ Days</span>
                  <p className="text-sm font-bold text-rose-300">{fmt(aging?.days90Plus || 0)}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>No Payment Gateway Policy:</strong> All collections represent verified offline bank transfers (NEFT / RTGS / IMPS / Cheque). Unverified references are quarantined until approved by finance administrators.
                </p>
              </div>
            </div>

            {/* Operating Flow Card */}
            <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Recorded Operating Flow</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                  <span className="text-slate-400">Total Collections</span>
                  <span className="font-mono font-bold text-emerald-400">+{fmt(stats?.totalCollected || 0)}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                  <span className="text-slate-400">Recorded Expenses</span>
                  <span className="font-mono font-bold text-rose-400">-{fmt(stats?.totalExpenses || 0)}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-bold text-white">Net Operating Cash</span>
                  <span className="font-mono font-bold text-white">{fmt(stats?.netOperatingCashflow || 0)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Quotation Funnel</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Accepted Quotes</span>
                  <span className="font-mono text-[#00D9FF]">{stats?.quotationCounts.accepted || 0} / {stats?.quotationCounts.total || 0}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#00D9FF] h-full"
                    style={{
                      width: `${
                        stats?.quotationCounts.total
                          ? ((stats.quotationCounts.accepted / stats.quotationCounts.total) * 100).toFixed(0)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: QUOTATIONS */}
      {subTab === "quotations" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Client Quotations &amp; Revisions</h3>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#087BFF] text-white font-mono text-xs flex items-center gap-1.5 hover:bg-[#00D9FF] hover:text-[#030B24] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Quotation</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Quote #</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Division</th>
                  <th className="py-2.5 px-3">Subtotal</th>
                  <th className="py-2.5 px-3">Tax (GST)</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Ver.</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{q.quoteNumber}</td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>{q.clientName}</div>
                      <div className="text-[10px] text-slate-500">{q.clientEmail}</div>
                    </td>
                    <td className="py-3 px-3 uppercase text-slate-400">{q.division}</td>
                    <td className="py-3 px-3">{fmt(q.subtotal, q.currency)}</td>
                    <td className="py-3 px-3 text-slate-400">{fmt(q.taxAmount, q.currency)}</td>
                    <td className="py-3 px-3 font-bold text-white">{fmt(q.totalAmount, q.currency)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        q.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-300' :
                        q.status === 'sent' ? 'bg-[#00D9FF]/20 text-[#00D9FF]' :
                        q.status === 'rejected' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/10 text-slate-300'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">v{q.version}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => setPreviewQuote(q)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#00D9FF]" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CONTRACTS */}
      {subTab === "contracts" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Commercial Agreements &amp; Contracts</h3>
            <button
              onClick={() => setContractModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#087BFF] text-white font-mono text-xs flex items-center gap-1.5 hover:bg-[#00D9FF] hover:text-[#030B24] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Contract</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Contract #</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Effective Date</th>
                  <th className="py-2.5 px-3">Value</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Signed Offline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-bold text-white">{c.contractNumber}</td>
                    <td className="py-3 px-3 text-slate-200">{c.title}</td>
                    <td className="py-3 px-3 uppercase text-slate-400">{c.contractType.replace("_", " ")}</td>
                    <td className="py-3 px-3">{c.effectiveDate}</td>
                    <td className="py-3 px-3 font-bold text-white">{fmt(c.contractValue, c.currency)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        c.status === 'executed' || c.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                        c.status === 'sent' ? 'bg-[#00D9FF]/20 text-[#00D9FF]' : 'bg-white/10 text-slate-300'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {c.signedOfflineAt ? new Date(c.signedOfflineAt).toLocaleDateString() : 'Pending Signature'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: INVOICES */}
      {subTab === "invoices" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Issued Invoices &amp; Balances</h3>
            <button
              onClick={() => setInvoiceModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#087BFF] text-white font-mono text-xs flex items-center gap-1.5 hover:bg-[#00D9FF] hover:text-[#030B24] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Invoice</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Invoice #</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3">Paid Amount</th>
                  <th className="py-2.5 px-3">Balance</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-bold text-white">{inv.invoiceNumber}</td>
                    <td className="py-3 px-3 text-slate-200">{inv.clientBusiness || inv.clientName}</td>
                    <td className="py-3 px-3 text-slate-400">{inv.dueDate}</td>
                    <td className="py-3 px-3 font-bold text-white">{fmt(inv.totalAmount, inv.currency)}</td>
                    <td className="py-3 px-3 text-emerald-400">{fmt(inv.paidAmount, inv.currency)}</td>
                    <td className="py-3 px-3 text-amber-300 font-bold">{fmt(inv.outstandingBalance, inv.currency)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' :
                        inv.status === 'partially_paid' ? 'bg-amber-500/20 text-amber-300' :
                        inv.status === 'overdue' ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => setPreviewInvoice(inv)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#00D9FF]" />
                        <span>Print/PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MANUAL PAYMENTS */}
      {subTab === "payments" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Verified Offline Payments</h3>
              <p className="text-xs text-slate-400">Manual bank transfers, NEFT/RTGS, UPI refs, and cheques</p>
            </div>
            <button
              onClick={() => setPaymentModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-[#030B24] font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Offline Receipt</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Payment Ref</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Bank UTR / Transaction ID</th>
                  <th className="py-2.5 px-3">Amount Received</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-bold text-white">{p.paymentReference}</td>
                    <td className="py-3 px-3 text-slate-400">{p.paymentDate}</td>
                    <td className="py-3 px-3 uppercase text-slate-300">{p.paymentMethod.replace("_", " ")}</td>
                    <td className="py-3 px-3 text-cyan-300">{p.externalTransactionRef || "N/A"}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{fmt(p.amountReceived, p.currency)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        p.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {p.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: EXPENSES */}
      {subTab === "expenses" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Operational Expenses</h3>
            <button
              onClick={() => setExpenseModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#087BFF] text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Expense</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Exp #</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Vendor</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-bold text-white">{e.expenseNumber}</td>
                    <td className="py-3 px-3 text-slate-200">{e.title}</td>
                    <td className="py-3 px-3 uppercase text-slate-400">{e.category.replace("_", " ")}</td>
                    <td className="py-3 px-3 text-slate-300">{e.vendor}</td>
                    <td className="py-3 px-3 text-slate-400">{e.expenseDate}</td>
                    <td className="py-3 px-3 font-bold text-rose-300">{fmt(e.amount, e.currency)}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-300">
                        {e.approvalStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: REPORTS */}
      {subTab === "reports" && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Financial Reports &amp; CSV Export</h3>
              <p className="text-xs text-slate-400">Export verified records with formula injection protection</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/api/admin/finance/reports?format=csv&type=invoices"
                download
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Export Invoices (.CSV)</span>
              </a>
              <a
                href="/api/admin/finance/reports?format=csv&type=payments"
                download
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Payments (.CSV)</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-white">Disclaimer on Operational Reports</h4>
            <p className="text-slate-400 leading-relaxed">
              These statements represent operational project records managed inside StarX Alpha Labs. They do not constitute statutory tax filings or formal chartered accountant audited financial accounts.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: FINANCE SETTINGS */}
      {subTab === "settings" && settings && (
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-6 max-w-2xl">
          <div>
            <h3 className="text-sm font-bold text-white">Bank Payment Instructions &amp; Tax Config</h3>
            <p className="text-xs text-slate-400">Configures instructions displayed to clients for manual bank transfers.</p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">Company Legal Name</label>
              <input
                type="text"
                disabled
                value={settings.companyLegalName}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Default Currency</label>
                <input
                  type="text"
                  disabled
                  value={settings.defaultCurrency}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tax Name &amp; Default Rate</label>
                <input
                  type="text"
                  disabled
                  value={`${settings.taxName} (${settings.defaultTaxRate}%)`}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="font-bold text-[#00D9FF]">Configured Bank Transfer Target (NEFT/RTGS)</h4>
              <p className="text-slate-300">Beneficiary: {settings.bankPaymentInstructions.beneficiaryName}</p>
              <p className="text-slate-300">Bank: {settings.bankPaymentInstructions.bankName}</p>
              <p className="text-slate-300">Account No: {settings.bankPaymentInstructions.accountNumber}</p>
              <p className="text-slate-300">IFSC: {settings.bankPaymentInstructions.ifscCode}</p>
              {settings.bankPaymentInstructions.upiId && (
                <p className="text-slate-300">UPI ID: {settings.bankPaymentInstructions.upiId}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: RECORD OFFLINE PAYMENT */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#071638] border border-white/15 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Record Offline Bank Receipt</h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const invId = fd.get("invoiceId") as string;
                const inv = invoices.find((i) => i.id === invId);

                const res = await fetch("/api/admin/finance/payments", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    invoiceId: invId,
                    organizationId: inv?.organizationId,
                    amountReceived: Number(fd.get("amount")),
                    paymentMethod: fd.get("paymentMethod"),
                    externalTransactionRef: fd.get("externalTransactionRef"),
                    internalNotes: fd.get("internalNotes"),
                    verificationStatus: "verified",
                  }),
                });

                if (res.ok) {
                  showToast("Payment recorded & invoice balance updated!");
                  setPaymentModalOpen(false);
                  loadFinanceData();
                } else {
                  const err = await res.json();
                  alert(err.error || "Failed to record payment");
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-slate-300 mb-1">Target Invoice *</label>
                <select name="invoiceId" required className="w-full p-2.5 rounded-xl bg-[#08183A] border border-white/10 text-white">
                  {invoices.filter((i) => i.outstandingBalance > 0).map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoiceNumber} — {inv.clientBusiness || inv.clientName} (Bal: {fmt(inv.outstandingBalance, inv.currency)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Amount Received (INR) *</label>
                  <input type="number" step="0.01" name="amount" required placeholder="50000" className="w-full p-2.5 rounded-xl bg-[#08183A] border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Payment Method *</label>
                  <select name="paymentMethod" required className="w-full p-2.5 rounded-xl bg-[#08183A] border border-white/10 text-white">
                    <option value="bank_transfer">Bank Transfer (NEFT/RTGS)</option>
                    <option value="imps">IMPS Immediate Transfer</option>
                    <option value="upi_manual">UPI Transfer Ref</option>
                    <option value="cheque">Cheque Deposit</option>
                    <option value="cash">Direct Cash Deposit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Bank UTR / Transaction Reference *</label>
                <input type="text" name="externalTransactionRef" required placeholder="HDFC000123456789" className="w-full p-2.5 rounded-xl bg-[#08183A] border border-white/10 text-white" />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Internal Notes</label>
                <input type="text" name="internalNotes" placeholder="Received in HDFC Current A/C" className="w-full p-2.5 rounded-xl bg-[#08183A] border border-white/10 text-white" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setPaymentModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#087BFF] text-white font-bold cursor-pointer">
                  Confirm Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INVOICE PREVIEW / PRINT */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-blue-900">STARX ALPHA LABS</h2>
                <p className="text-xs text-slate-500">Technology &amp; Software Engineering Company</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-mono text-slate-400">INVOICE</span>
                <p className="text-lg font-bold font-mono text-slate-900">{previewInvoice.invoiceNumber}</p>
                <p className="text-xs text-slate-500">Date: {previewInvoice.issueDate}</p>
                <p className="text-xs text-rose-600 font-semibold">Due: {previewInvoice.dueDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-700 uppercase font-mono">Billed To:</h4>
                <p className="font-bold text-slate-900">{previewInvoice.clientBusiness || previewInvoice.clientName}</p>
                <p className="text-slate-600">{previewInvoice.clientEmail}</p>
                {previewInvoice.billingAddress && <p className="text-slate-600">{previewInvoice.billingAddress}</p>}
              </div>
              <div className="text-right">
                <h4 className="font-bold text-slate-700 uppercase font-mono">Status:</h4>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-800">
                  {previewInvoice.status}
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left text-xs border-t border-b">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-600 font-mono">
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3 text-right">Qty</th>
                  <th className="py-2 px-3 text-right">Unit Price</th>
                  <th className="py-2 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {previewInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3">{item.description}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{fmt(item.unitPrice, previewInvoice.currency)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">{fmt(item.amount, previewInvoice.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end text-xs font-mono space-y-1">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>{fmt(previewInvoice.subtotal, previewInvoice.currency)}</span>
                </div>
                {previewInvoice.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-{fmt(previewInvoice.discountAmount, previewInvoice.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>{previewInvoice.taxName} ({previewInvoice.taxRatePercent}%):</span>
                  <span>{fmt(previewInvoice.taxAmount, previewInvoice.currency)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t">
                  <span>Total Amount:</span>
                  <span>{fmt(previewInvoice.totalAmount, previewInvoice.currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Amount Paid:</span>
                  <span>{fmt(previewInvoice.paidAmount, previewInvoice.currency)}</span>
                </div>
                <div className="flex justify-between text-amber-700 font-bold text-sm pt-1 border-t">
                  <span>Remaining Balance:</span>
                  <span>{fmt(previewInvoice.outstandingBalance, previewInvoice.currency)}</span>
                </div>
              </div>
            </div>

            {/* Payment instructions */}
            <div className="p-3.5 rounded-xl bg-slate-50 border text-xs text-slate-600 space-y-1">
              <h5 className="font-bold text-slate-800">Direct Bank Payment Instructions:</h5>
              <p>Beneficiary: StarX Alpha Labs</p>
              <p>Bank: HDFC Bank | A/C: 50200088991122 | IFSC: HDFC0001234</p>
              <p className="text-[11px] text-slate-500">Please mention invoice number {previewInvoice.invoiceNumber} in the transfer remarks.</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setPreviewInvoice(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-mono text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
