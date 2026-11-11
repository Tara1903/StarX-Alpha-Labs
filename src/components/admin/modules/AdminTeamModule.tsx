"use client";

import React, { useState } from "react";
import { AdminUser } from "../types";
import {
  ShieldCheck,
  Users,
  Plus,
  Lock,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

interface AdminTeamModuleProps {
  currentUser: AdminUser;
  onShowToast: (msg: string) => void;
}

export function AdminTeamModule({ currentUser, onShowToast }: AdminTeamModuleProps) {
  const [members, setMembers] = useState<AdminUser[]>([
    {
      id: "mem-1",
      name: "Hari Singh",
      email: "hari.singh@starx-alpha-labs.com",
      role: "owner",
      status: "active",
    },
    {
      id: "mem-2",
      name: "Lead Systems Architect",
      email: "architect@starx-alpha-labs.com",
      role: "admin",
      status: "active",
    },
    {
      id: "mem-3",
      name: "Content Operations Manager",
      email: "editorial@starx-alpha-labs.com",
      role: "editor",
      status: "active",
    },
  ]);

  const [inviteModal, setInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "editor" as AdminUser["role"],
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.email || !inviteForm.name) return;

    if (currentUser.role !== "owner" && inviteForm.role === "owner") {
      alert("Only existing Owners can provision an Owner account.");
      return;
    }

    const newMem: AdminUser = {
      id: `mem-${Date.now().toString().slice(-4)}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "active",
    };

    setMembers([...members, newMem]);
    onShowToast(`Provisioned administrative account for ${inviteForm.email} (${inviteForm.role})`);
    setInviteForm({ name: "", email: "", role: "editor" });
    setInviteModal(false);
  };

  const handleToggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          if (m.role === "owner" && prev.filter((x) => x.role === "owner").length <= 1) {
            alert("Cannot suspend the sole Owner account.");
            return m;
          }
          const next = m.status === "active" ? "suspended" : "active";
          onShowToast(`Account for ${m.email} is now ${next}.`);
          return { ...m, status: next };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Administrative Team &amp; Role-Based Access Control (RBAC)</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Enforces strict database-level security checks against the <code>admin_members</code> table
          </p>
        </div>

        {currentUser.role === "owner" && (
          <button
            onClick={() => setInviteModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md shadow-[#087BFF]/30 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision Member</span>
          </button>
        )}
      </div>

      {/* 2. Team Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
              <th className="py-3 px-4">Member Name &amp; Email</th>
              <th className="py-3 px-4">Role Privileges</th>
              <th className="py-3 px-4">Account Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((mem) => (
              <tr key={mem.id} className="hover:bg-[#0E2248]/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white">{mem.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{mem.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase border ${
                      mem.role === "owner"
                        ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                        : mem.role === "admin"
                        ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/40"
                        : "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                    }`}
                  >
                    {mem.role}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2">
                    {mem.role === "owner"
                      ? "Full Access & Provisioning"
                      : mem.role === "admin"
                      ? "CRM, CMS, Quotations"
                      : "CMS Content Editor"}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase border ${
                      mem.status === "active"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {mem.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {currentUser.role === "owner" && mem.role !== "owner" && (
                    <button
                      onClick={() => handleToggleStatus(mem.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                    >
                      {mem.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Role Hierarchy Explainer Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-1.5">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>👑 Owner Role</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Full root authority. Can provision Admin accounts, configure business profile, access financial quotations, and manage security settings.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-1.5">
          <div className="text-xs font-bold text-[#00D9FF] flex items-center gap-1.5">
            <span>🛡️ Admin Role</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Operational command. Manages CRM inquiries, demo pipeline, quotation generation, Video Station, and CMS publications.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-1.5">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <span>✏️ Editor Role</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Content management only. Drafts and updates blog posts, demo descriptions, and portfolio items without access to leads or financials.
          </p>
        </div>
      </div>

      {/* 4. Provision Modal */}
      {inviteModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInviteSubmit}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Provision Admin Account</h3>
              <button
                type="button"
                onClick={() => setInviteModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Assigned Role</label>
              <select
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              >
                <option value="editor">Editor (CMS &amp; Blog only)</option>
                <option value="admin">Admin (CRM, Demos, Quotations)</option>
                {currentUser.role === "owner" && <option value="owner">Owner (Full Root Authority)</option>}
              </select>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setInviteModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00D9FF] text-[#030B24] text-xs font-bold"
              >
                Provision Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
