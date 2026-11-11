"use client";

import React, { useState } from "react";
import { ClientSupportTicket } from "@/types/customerPortal";
import { 
  HelpCircle, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Phone,
  MessageSquare
} from "lucide-react";

interface SupportModuleProps {
  tickets: ClientSupportTicket[];
  onCreateTicket: (data: { subject: string; description: string; priority: string }) => void;
}

export function SupportModule({
  tickets,
  onCreateTicket,
}: SupportModuleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "medium",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
      case "closed":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            RESOLVED
          </span>
        );
      case "in_progress":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
            IN PROGRESS
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            OPEN
          </span>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.description) return;
    onCreateTicket(form);
    setModalOpen(false);
    setForm({ subject: "", description: "", priority: "medium" });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Client Technical Assistance &amp; Help Desk ({tickets.length})</h2>
          <p className="text-xs text-slate-400">Direct engineering escalation for access issues, environment blockers, or general questions</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Assistance Request</span>
        </button>
      </div>

      {/* Emergency Hotline Notice */}
      <div className="p-4 rounded-2xl bg-[#08183A] border border-[#00D9FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#087BFF]/20 text-[#00D9FF]">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Direct Production Hotline</div>
            <div className="text-[11px] text-slate-400">Need urgent assistance? Contact Hari Singh &amp; team directly via phone or WhatsApp.</div>
          </div>
        </div>

        <a
          href="https://wa.me/919660937033"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold border border-emerald-500/40 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>WhatsApp Escalation</span>
        </a>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#071638] border border-white/10 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Open Support Tickets</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
              All systems operational. If you encounter any unexpected behavior, click "New Assistance Request" to reach an engineer.
            </p>
          </div>
        ) : (
          tickets.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#00D9FF]">
                      {t.ticketNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {t.priority}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{t.subject}</h3>
                </div>

                <div>{getStatusBadge(t.status)}</div>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t.description}
              </p>
            </div>
          ))
        )}
      </div>

      {/* New Ticket Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Submit Assistance Request</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Subject *</label>
              <input
                type="text"
                required
                placeholder="e.g. Request access to staging database or questions about Sprint 2"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              >
                <option value="low">Low (General Query)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="high">High (Urgent Blocker)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Detailed Description *</label>
              <textarea
                rows={4}
                required
                placeholder="Please describe your question, blocker, or requirement in detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
