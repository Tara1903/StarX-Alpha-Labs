"use client";

import React, { useState, useEffect } from "react";
import {
  Receipt,
  FileText,
  FileCheck2,
  Building,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer,
  Eye,
  Check,
  X,
  Send,
  ShieldCheck,
  RefreshCw,
  Copy,
} from "lucide-react";
import type { Invoice, Quotation, Contract, PaymentRecord, FinanceSettings } from "@/types/finance";

interface FinancesModuleProps {
  onShowToast?: (msg: string) => void;
}

export function FinancesModule({ onShowToast }: FinancesModuleProps) {
  const [activeSubTab, setActiveSubTab] = useState<"invoices" | "quotations" | "contracts" | "instructions">("invoices");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);

  // Modals & Forms
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [offlineNoticeModal, setOfflineNoticeModal] = useState<Invoice | null>(null);
  const [submittingNotice, setSubmittingNotice] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    amount: 0,
    paymentMethod: "bank_transfer",
    referenceNumber: "",
    paymentDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [rejectQuoteModal, setRejectQuoteModal] = useState<Quotation | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actingQuoteId, setActingQuoteId] = useState<string | null>(null);

  const fetchFinanceData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/finance");
      if (!res.ok) {
        throw new Error(`Failed to load financial records (${res.status})`);
      }
      const data = await res.json();
      setInvoices(data.invoices || []);
      setQuotations(data.quotations || []);
      setContracts(data.contracts || []);
      setSettings(data.settings || null);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while loading financial data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const handleAcceptQuote = async (quote: Quotation) => {
    if (!confirm(`Are you sure you want to accept Quotation ${quote.quoteNumber}? This will notify StarX Alpha Labs to initiate project contracts.`)) {
      return;
    }
    setActingQuoteId(quote.id);
    try {
      const res = await fetch("/api/customer/finance", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "accept_quotation",
          quotationId: quote.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to accept quotation");
      if (onShowToast) onShowToast("Quotation accepted successfully! Project team has been notified.");
      fetchFinanceData();
    } catch (err: any) {
      alert(err.message || "Could not accept quotation");
    } finally {
      setActingQuoteId(null);
    }
  };

  const handleRejectQuote = async () => {
    if (!rejectQuoteModal) return;
    if (!rejectionReason.trim()) {
      alert("Please provide a reason or modification request.");
      return;
    }
    setActingQuoteId(rejectQuoteModal.id);
    try {
      const res = await fetch("/api/customer/finance", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject_quotation",
          quotationId: rejectQuoteModal.id,
          reason: rejectionReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit revision request");
      if (onShowToast) onShowToast("Quotation feedback submitted to account director.");
      setRejectQuoteModal(null);
      setRejectionReason("");
      fetchFinanceData();
    } catch (err: any) {
      alert(err.message || "Could not submit feedback");
    } finally {
      setActingQuoteId(null);
    }
  };

  const handleSubmitPaymentNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineNoticeModal) return;
    if (noticeForm.amount <= 0) {
      alert("Please enter a valid amount paid.");
      return;
    }
    if (!noticeForm.referenceNumber.trim()) {
      alert("Please provide the transaction reference / UTR number.");
      return;
    }

    setSubmittingNotice(true);
    try {
      const res = await fetch("/api/customer/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: offlineNoticeModal.id,
          amount: noticeForm.amount,
          paymentMethod: noticeForm.paymentMethod,
          referenceNumber: noticeForm.referenceNumber,
          paymentDate: noticeForm.paymentDate,
          notes: noticeForm.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit payment reference");
      if (onShowToast) onShowToast("Payment reference submitted! StarX Finance will verify and update your invoice.");
      setOfflineNoticeModal(null);
      setNoticeForm({
        amount: 0,
        paymentMethod: "bank_transfer",
        referenceNumber: "",
        paymentDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
      fetchFinanceData();
    } catch (err: any) {
      alert(err.message || "Could not submit payment notice");
    } finally {
      setSubmittingNotice(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`Copied ${label} to clipboard`);
  };

  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.outstandingBalance || 0), 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#040E26] via-[#081B4B] to-[#040E26] border border-[#00D9FF]/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
              <Receipt className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-wide">Invoices & Quotations</h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Access verified billing statements, quotations, executed contracts, and StarX Alpha Labs bank transfer details.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Total Outstanding</p>
            <p className={`text-xl font-bold font-mono ${totalOutstanding > 0 ? "text-amber-400" : "text-emerald-400"}`}>
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={fetchFinanceData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Refresh financial data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#00D9FF]" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab("invoices")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === "invoices"
              ? "bg-[#087BFF] text-white shadow-lg shadow-[#087BFF]/20 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Receipt className="w-4 h-4" />
          Invoices ({invoices.length})
        </button>

        <button
          onClick={() => setActiveSubTab("quotations")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === "quotations"
              ? "bg-[#087BFF] text-white shadow-lg shadow-[#087BFF]/20 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText className="w-4 h-4" />
          Quotations ({quotations.length})
        </button>

        <button
          onClick={() => setActiveSubTab("contracts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === "contracts"
              ? "bg-[#087BFF] text-white shadow-lg shadow-[#087BFF]/20 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          Contracts & Agreements ({contracts.length})
        </button>

        <button
          onClick={() => setActiveSubTab("instructions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === "instructions"
              ? "bg-[#087BFF] text-white shadow-lg shadow-[#087BFF]/20 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building className="w-4 h-4" />
          Bank Payment Details
        </button>
      </div>

      {/* 3. Status alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 4. Tab 1: Invoices */}
      {activeSubTab === "invoices" && (
        <div className="space-y-4">
          {invoices.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5">
              <Receipt className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No Invoices Issued Yet</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                Your project manager will issue milestone invoices here according to your signed agreement.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#040E26]/60 backdrop-blur-md">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-white/5 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3.5 px-4">Invoice #</th>
                    <th className="py-3.5 px-4">Issue Date</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4 text-right">Total Amount</th>
                    <th className="py-3.5 px-4 text-right">Paid</th>
                    <th className="py-3.5 px-4 text-right">Balance Due</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-white">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(inv.issueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(inv.dueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-white">
                        ₹{inv.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                        ₹{inv.paidAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold">
                        <span className={inv.outstandingBalance > 0 ? "text-amber-400" : "text-slate-400"}>
                          ₹{inv.outstandingBalance.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono uppercase font-semibold ${
                          inv.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : inv.status === "partially_paid"
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                            : inv.status === "overdue"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {inv.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00D9FF] hover:text-white transition-colors"
                            title="View Invoice"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {inv.outstandingBalance > 0 && (
                            <button
                              onClick={() => {
                                setOfflineNoticeModal(inv);
                                setNoticeForm({
                                  amount: inv.outstandingBalance,
                                  paymentMethod: "bank_transfer",
                                  referenceNumber: "",
                                  paymentDate: new Date().toISOString().split("T")[0],
                                  notes: "",
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30 text-xs font-medium transition-colors"
                            >
                              Submit UTR
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 5. Tab 2: Quotations */}
      {activeSubTab === "quotations" && (
        <div className="space-y-4">
          {quotations.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No Quotations Available</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                Formal project proposals prepared for your organization will appear here for review and digital acceptance.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotations.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#040E26]/70 border border-white/10 hover:border-[#00D9FF]/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                          {q.quoteNumber} • v{q.version || 1}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {q.packageName || q.scopeDescription || "Project Development Quotation"}
                        </h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold uppercase ${
                        q.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : q.status === "rejected"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      }`}>
                        {q.status}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Valid Until:</span>
                        <span className="text-slate-200 font-mono">
                          {q.validUntil ? new Date(q.validUntil).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "30 Days from Issue"}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Items:</span>
                        <span className="text-slate-200 font-mono">
                          {q.items?.length || 0} scope elements
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-sm pt-1 border-t border-white/10 text-white">
                        <span>Total Quote:</span>
                        <span className="font-mono font-bold text-[#00D9FF]">
                          ₹{q.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {q.termsAndConditions && (
                      <p className="text-xs text-slate-400 line-clamp-2 italic">
                        &quot;{q.termsAndConditions}&quot;
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between gap-2">
                    {q.status === "sent" ? (
                      <>
                        <button
                          onClick={() => setRejectQuoteModal(q)}
                          disabled={actingQuoteId === q.id}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/10 text-xs font-medium transition-colors"
                        >
                          Request Revision
                        </button>
                        <button
                          onClick={() => handleAcceptQuote(q)}
                          disabled={actingQuoteId === q.id}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#040E26] font-bold text-xs transition-colors shadow-lg shadow-[#00D9FF]/20"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept Quotation
                        </button>
                      </>
                    ) : q.status === "accepted" ? (
                      <div className="w-full flex items-center gap-2 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Accepted on {q.acceptedAt ? new Date(q.acceptedAt).toLocaleDateString("en-IN") : "Record"}</span>
                      </div>
                    ) : (
                      <div className="w-full text-xs text-slate-400 font-mono">
                        Status: {q.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Tab 3: Contracts */}
      {activeSubTab === "contracts" && (
        <div className="space-y-4">
          {contracts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5">
              <FileCheck2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No Active Contracts</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                Formal Master Services Agreements and statements of work will be indexed here once generated.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {contracts.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-[#040E26]/70 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                        {c.contractNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold uppercase ${
                        c.status === "executed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      }`}>
                        {c.status.replace("_", " ")}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{c.title}</h4>
                    <p className="text-xs text-slate-400">
                      Contract Value: <span className="text-white font-mono font-semibold">₹{c.contractValue.toLocaleString("en-IN")}</span>
                      {c.effectiveDate && ` • Effective: ${new Date(c.effectiveDate).toLocaleDateString("en-IN")}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {c.documentUrl ? (
                      <a
                        href={c.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Document
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Signed offline</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Tab 4: Bank Details & Instructions */}
      {activeSubTab === "instructions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#040E26]/80 border border-[#00D9FF]/20 space-y-4">
            <div className="flex items-center gap-2 text-[#00D9FF]">
              <Building className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Direct Bank Transfer (NEFT / RTGS / IMPS)</h3>
            </div>
            <p className="text-xs text-slate-300">
              StarX Alpha Labs processes commercial agreements strictly via official banking channels. No payment gateway charges or card fees apply.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block">Account Holder Name</span>
                  <span className="text-white font-medium">{settings?.bankPaymentInstructions?.beneficiaryName || "StarX Alpha Labs Pvt Ltd"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings?.bankPaymentInstructions?.beneficiaryName || "StarX Alpha Labs Pvt Ltd", "Account Holder")}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block">Bank Name & Branch</span>
                  <span className="text-white font-medium">{settings?.bankPaymentInstructions?.bankName || "HDFC Bank Ltd, Technology Park Branch"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings?.bankPaymentInstructions?.bankName || "HDFC Bank Ltd", "Bank Name")}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block">Account Number</span>
                  <span className="text-[#00D9FF] font-mono font-bold tracking-wider">{settings?.bankPaymentInstructions?.accountNumber || "50200084920192"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings?.bankPaymentInstructions?.accountNumber || "50200084920192", "Account Number")}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block">IFSC Code</span>
                  <span className="text-white font-mono font-bold">{settings?.bankPaymentInstructions?.ifscCode || "HDFC0001824"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings?.bankPaymentInstructions?.ifscCode || "HDFC0001824", "IFSC Code")}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {settings?.taxIdNumber && (
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <span className="text-xs text-slate-400 block">Company GSTIN</span>
                    <span className="text-white font-mono">{settings.taxIdNumber}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(settings.taxIdNumber || "", "GSTIN")}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#040E26]/80 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">How Payment Verification Works</h3>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-xs text-slate-300 leading-relaxed">
              <li>
                <strong className="text-white">Initiate Transfer:</strong> Transfer the milestone or invoice amount via your corporate banking portal or business UPI.
              </li>
              <li>
                <strong className="text-white">Copy Reference / UTR:</strong> Note the 12-digit or 16-digit UTR/transaction reference ID provided by your bank.
              </li>
              <li>
                <strong className="text-white">Submit UTR in Portal:</strong> Click &quot;Submit UTR&quot; on your invoice in the list above to record the reference.
              </li>
              <li>
                <strong className="text-white">Reconciliation:</strong> The StarX Alpha Labs finance desk verifies the funds in our accounts ledger and immediately issues an official payment receipt.
              </li>
            </ol>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Please include your Invoice Number in the transfer remarks/narration for instant identification and automatic receipt dispatch.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: VIEW & PRINT INVOICE */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl bg-[#0B1528] border border-white/20 p-6 md:p-8 space-y-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                  Tax Invoice
                </span>
                <h2 className="text-2xl font-bold font-mono mt-0.5">{selectedInvoice.invoiceNumber}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-mono uppercase">Issue Date</span>
                <span className="font-medium text-white">{selectedInvoice.issueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono uppercase">Due Date</span>
                <span className="font-medium text-white">{selectedInvoice.dueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono uppercase">Status</span>
                <span className="font-mono uppercase font-bold text-[#00D9FF]">{selectedInvoice.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono uppercase">Currency</span>
                <span className="font-mono text-white">{selectedInvoice.currency}</span>
              </div>
            </div>

            {/* Line items */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 font-mono uppercase text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(selectedInvoice.items || []).map((li: any, idx: number) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 text-slate-200">{li.description}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-400">{li.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-300">₹{li.unitPrice.toLocaleString("en-IN")}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-white font-medium">₹{li.amount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">₹{selectedInvoice.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax ({selectedInvoice.taxRatePercent || 18}%):</span>
                  <span className="font-mono text-white">₹{selectedInvoice.taxAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2 text-white">
                  <span>Total Amount:</span>
                  <span className="font-mono text-[#00D9FF]">₹{selectedInvoice.totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Amount Paid:</span>
                  <span className="font-mono text-emerald-400">₹{selectedInvoice.paidAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-1 text-amber-400">
                  <span>Outstanding Balance:</span>
                  <span className="font-mono">₹{selectedInvoice.outstandingBalance.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Payment instructions */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1">
              <span className="text-white font-bold block">Payment Instructions:</span>
              <p>
                Please deposit the balance via NEFT / RTGS to <strong>{settings?.bankPaymentInstructions?.beneficiaryName || "StarX Alpha Labs Pvt Ltd"}</strong>, IFSC: <strong>{settings?.bankPaymentInstructions?.ifscCode || "HDFC0001824"}</strong>, A/C: <strong>{settings?.bankPaymentInstructions?.accountNumber || "50200084920192"}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SUBMIT UTR / PAYMENT REFERENCE */}
      {offlineNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0B1528] border border-white/20 p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold">Submit Payment UTR</h3>
                <p className="text-xs text-slate-400 font-mono">Invoice: {offlineNoticeModal.invoiceNumber}</p>
              </div>
              <button
                onClick={() => setOfflineNoticeModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPaymentNotice} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Amount Paid (₹)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={noticeForm.amount}
                  onChange={(e) => setNoticeForm({ ...noticeForm, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:border-[#00D9FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Payment Method</label>
                <select
                  value={noticeForm.paymentMethod}
                  onChange={(e) => setNoticeForm({ ...noticeForm, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#040E26] border border-white/10 text-white focus:border-[#00D9FF] focus:outline-none"
                >
                  <option value="bank_transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
                  <option value="upi">Business UPI</option>
                  <option value="cheque">Cheque Deposit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">UTR / Transaction Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HDFCR520261111928491"
                  value={noticeForm.referenceNumber}
                  onChange={(e) => setNoticeForm({ ...noticeForm, referenceNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono uppercase focus:border-[#00D9FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Transfer Date</label>
                <input
                  type="date"
                  required
                  value={noticeForm.paymentDate}
                  onChange={(e) => setNoticeForm({ ...noticeForm, paymentDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00D9FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Additional Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Sent from Axis Bank corporate account"
                  value={noticeForm.notes}
                  onChange={(e) => setNoticeForm({ ...noticeForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00D9FF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOfflineNoticeModal(null)}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingNotice}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#040E26] font-bold shadow-lg shadow-[#00D9FF]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submittingNotice ? "Submitting..." : "Submit for Verification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: REJECT / REVISE QUOTATION */}
      {rejectQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0B1528] border border-white/20 p-6 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold">Request Revision for {rejectQuoteModal.quoteNumber}</h3>
              <button
                onClick={() => setRejectQuoteModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Please outline any changes in scope, timeline, or commercial terms you require. The account team will prepare an amended revision.
            </p>

            <textarea
              rows={4}
              required
              placeholder="e.g. Please split Milestone 2 into two phases, or adjust the mobile responsive scope..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setRejectQuoteModal(null)}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectQuote}
                disabled={actingQuoteId === rejectQuoteModal.id}
                className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold"
              >
                {actingQuoteId === rejectQuoteModal.id ? "Sending..." : "Submit Revision Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
