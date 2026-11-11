"use client";

import React, { useState } from "react";
import { ClientChangeRequestItem } from "@/types/customerPortal";
import { 
  GitPullRequest, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  X 
} from "lucide-react";

interface ChangeRequestsModuleProps {
  changeRequests: ClientChangeRequestItem[];
  onSubmitChangeRequest: (data: { title: string; description: string; justification?: string; priority: string }) => void;
}

export function ChangeRequestsModule({
  changeRequests,
  onSubmitChangeRequest,
}: ChangeRequestsModuleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    justification: "",
    priority: "medium",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
      case "completed":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            ACCEPTED
          </span>
        );
      case "under_review":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
            UNDER REVIEW
          </span>
        );
      case "rejected":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
            DECLINED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SUBMITTED
          </span>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    onSubmitChangeRequest(form);
    setModalOpen(false);
    setForm({ title: "", description: "", justification: "", priority: "medium" });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Project Scope Change Requests ({changeRequests.length})</h2>
          <p className="text-xs text-slate-400">Formal requests for architectural adjustments, scope enhancements, or feature revisions</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Change Request</span>
        </button>
      </div>

      {/* Change Requests List */}
      <div className="space-y-4">
        {changeRequests.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#071638] border border-white/10 text-center space-y-2">
            <GitPullRequest className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Scope Change Requests</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
              Your project is progressing according to original approved specifications. If you need new feature modules or scope expansions, click "New Change Request".
            </p>
          </div>
        ) : (
          changeRequests.map((cr) => (
            <div
              key={cr.id}
              className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#00D9FF] font-bold uppercase">
                      Priority: {cr.priority}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(cr.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{cr.title}</h3>
                </div>

                <div>{getStatusBadge(cr.status)}</div>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {cr.description}
              </p>

              {cr.justification && (
                <div className="p-3 rounded-xl bg-[#08183A] text-xs text-slate-400">
                  <strong className="text-slate-300">Business Justification:</strong> {cr.justification}
                </div>
              )}

              {cr.adminResponse && (
                <div className="p-3 rounded-xl bg-[#087BFF]/10 border border-[#087BFF]/30 text-xs text-slate-200">
                  <strong className="text-[#00D9FF]">Lead Architect Response:</strong> {cr.adminResponse}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Change Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Submit Scope Change Request</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Request Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Add Multi-Currency Razorpay Checkout Module"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                >
                  <option value="low">Low (Next Phase)</option>
                  <option value="medium">Medium (Current Sprint)</option>
                  <option value="high">High (Immediate)</option>
                  <option value="urgent">Urgent Blocker</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Detailed Description *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe the requested feature, component, or workflow revision in detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Business Justification</label>
              <input
                type="text"
                placeholder="Why is this addition necessary for business operations?"
                value={form.justification}
                onChange={(e) => setForm({ ...form, justification: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
