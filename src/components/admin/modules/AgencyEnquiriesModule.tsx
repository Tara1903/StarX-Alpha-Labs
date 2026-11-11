"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  ExternalLink,
  CheckCircle2,
  PhoneCall,
  Mail,
  Building,
  DollarSign,
  Download,
} from "lucide-react";

interface AgencyEnquiry {
  id: string;
  code: string;
  agencyName: string;
  website?: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  monthlyProjects: string;
  primaryServices: string;
  partnershipTier: string;
  message?: string;
  status: "new" | "reviewing" | "contacted" | "partner_onboarded" | "declined";
  createdAt: string;
}

interface AgencyEnquiriesModuleProps {
  enquiries: AgencyEnquiry[];
  onUpdateStatus: (id: string, status: AgencyEnquiry["status"]) => void;
  onShowToast: (msg: string) => void;
}

export function AgencyEnquiriesModule({
  enquiries,
  onUpdateStatus,
  onShowToast,
}: AgencyEnquiriesModuleProps) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AgencyEnquiry | null>(null);

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      !search.trim() ||
      e.agencyName.toLowerCase().includes(search.toLowerCase()) ||
      e.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search);

    const matchesTier = tierFilter === "all" || e.partnershipTier === tierFilter;

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 text-left">
      {/* 1. Filter Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agency, contact, code..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Partnership Tiers</option>
            <option value="Standard Partner">Standard Partner (1-2 mo)</option>
            <option value="Growth Partner">Growth Partner (3-5 mo)</option>
            <option value="Enterprise White-Label">Enterprise White-Label (6+ mo)</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <strong>{filtered.length}</strong> of {enquiries.length} Applications
        </div>
      </div>

      {/* 2. Enquiries Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Code / Tier</th>
                <th className="py-3 px-4">Agency &amp; Contact</th>
                <th className="py-3 px-4">Volume &amp; Services</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No agency partnership applications found.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => {
                  const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    enq.contactPerson
                  )},%20this%20is%20StarX%20Alpha%20Labs%20regarding%20your%20White-Label%20Agency%20Application%20${encodeURIComponent(
                    enq.code
                  )}.`;

                  return (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className="hover:bg-[#0E2248]/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-amber-400">{enq.code}</div>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/10 text-amber-300">
                          {enq.partnershipTier}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{enq.agencyName}</span>
                          {enq.website && (
                            <a
                              href={enq.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-[#00D9FF]"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <div className="text-slate-300 text-[11px]">{enq.contactPerson}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{enq.phone || enq.email}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium">{enq.monthlyProjects} projects/mo</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-xs">{enq.primaryServices}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">{enq.country}</td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                            enq.status === "new"
                              ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                              : enq.status === "reviewing"
                              ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                              : enq.status === "partner_onboarded"
                              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                              : "bg-blue-400/10 text-blue-300 border-blue-400/40"
                          }`}
                        >
                          {enq.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {enq.phone && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#00C98B]/10 text-[#00C98B] hover:bg-[#00C98B]/20 text-[10px] font-mono font-bold"
                            >
                              WhatsApp
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedEnquiry(enq)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-amber-400/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                  {selectedEnquiry.code}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {selectedEnquiry.agencyName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#08183A] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Contact Partner</span>
                <div className="text-white font-bold">{selectedEnquiry.contactPerson}</div>
                <div className="text-slate-300 font-mono">{selectedEnquiry.phone}</div>
                <div className="text-slate-300">{selectedEnquiry.email}</div>
                {selectedEnquiry.website && (
                  <a
                    href={selectedEnquiry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D9FF] hover:underline block pt-1"
                  >
                    {selectedEnquiry.website}
                  </a>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#08183A] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Partnership Model</span>
                <div className="text-amber-300 font-bold">{selectedEnquiry.partnershipTier}</div>
                <div className="text-slate-300">Volume: {selectedEnquiry.monthlyProjects} projects/month</div>
                <div className="text-slate-400">Country: {selectedEnquiry.country}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#08183A] space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">Services &amp; Partnership Scope</span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedEnquiry.primaryServices}
              </p>
              {selectedEnquiry.message && (
                <p className="text-xs text-slate-300 pt-2 border-t border-white/5 italic">
                  &ldquo;{selectedEnquiry.message}&rdquo;
                </p>
              )}
            </div>

            {/* Status updates */}
            <div className="p-4 rounded-2xl bg-[#08183A] space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">Update Application Status</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {["new", "reviewing", "contacted", "partner_onboarded", "declined"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateStatus(selectedEnquiry.id, st as any);
                      setSelectedEnquiry((prev) => (prev ? { ...prev, status: st as any } : null));
                      onShowToast(`Agency status updated to ${st.replace("_", " ")}`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedEnquiry.status === st
                        ? "bg-amber-400 text-[#030B24] shadow-md shadow-amber-400/40"
                        : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Applied: {selectedEnquiry.createdAt}</span>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
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
