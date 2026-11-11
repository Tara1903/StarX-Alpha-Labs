"use client";

import React, { useState } from "react";
import { CustomerSessionContext } from "@/types/customerPortal";
import { 
  Building2, 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  X,
  CheckCircle2
} from "lucide-react";

interface OrganizationModuleProps {
  session: CustomerSessionContext | null;
  onInviteMember: (data: { email: string; fullName: string; role: string }) => void;
}

export function OrganizationModule({
  session,
  onInviteMember,
}: OrganizationModuleProps) {
  const org = session?.organization;
  const isOwner = session?.membership.role === "owner";

  const [inviteModal, setInviteModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "member",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email) return;
    onInviteMember(form);
    setInviteModal(false);
    setForm({ fullName: "", email: "", role: "member" });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Client Organization Profile</h2>
          <p className="text-xs text-slate-400">Registered business entity and authorized project stakeholders</p>
        </div>

        {isOwner && (
          <button
            onClick={() => setInviteModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Organization Details Grid */}
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#08183A] text-[#00D9FF]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{org?.name || "Client Organization"}</h3>
              <div className="text-xs text-slate-400">{org?.businessType || "Enterprise Client"}</div>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            {org?.status ? org.status.toUpperCase() : "ACTIVE"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
            <div className="text-slate-400 font-mono flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Primary Email</span>
            </div>
            <div className="font-bold text-white truncate">{org?.primaryContactEmail || "—"}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
            <div className="text-slate-400 font-mono flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Number</span>
            </div>
            <div className="font-bold text-white">{org?.phone || "—"}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
            <div className="text-slate-400 font-mono flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Jurisdiction / Country</span>
            </div>
            <div className="font-bold text-white">{org?.country || "India"}</div>
          </div>
        </div>
      </div>

      {/* Authorized Members Roster */}
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
          <Users className="w-4 h-4 text-[#00D9FF]" />
          <span>Authorized Organization Stakeholders</span>
        </h3>

        <div className="space-y-2">
          <div className="p-4 rounded-2xl bg-[#08183A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#087BFF] to-[#00D9FF] text-[#030B24] font-black text-xs flex items-center justify-center">
                {session?.user.fullName ? session.user.fullName[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{session?.user.fullName}</div>
                <div className="text-[11px] text-slate-400 font-mono">{session?.user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold uppercase">
                {session?.membership.role}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {inviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Invite Organization Member</h3>
              <button
                type="button"
                onClick={() => setInviteModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Business Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. rahul@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Access Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              >
                <option value="member">Member (Can review, comment &amp; approve deliverables)</option>
                <option value="viewer">Viewer (Read-only access to files &amp; milestones)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setInviteModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold"
              >
                Send Secure Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
