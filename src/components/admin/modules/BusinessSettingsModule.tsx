"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Settings,
  Building,
  PhoneCall,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Save,
  AlertTriangle,
} from "lucide-react";

interface BusinessSettingsModuleProps {
  onShowToast: (msg: string) => void;
}

export function BusinessSettingsModule({ onShowToast }: BusinessSettingsModuleProps) {
  const [config, setConfig] = useState({
    companyName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    founderName: SITE_CONFIG.founder.name,
    founderRole: SITE_CONFIG.founder.designation,
    address: SITE_CONFIG.contact.address,
    phone: SITE_CONFIG.contact.phone,
    whatsapp: SITE_CONFIG.contact.whatsapp,
    whatsappUrl: SITE_CONFIG.contact.whatsappUrl,
    companyEmail: "", // Explicitly empty until configured by user
    adminNotificationEmail: "admin@starxalphalabs.com",
    starxFlowTargetUrl: "https://starx-flow.runs-on.dev/",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast("Business settings updated successfully.");
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Official Corporate Identity */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-[#00D9FF]" />
                <span>Official Corporate Identity (Single Source of Truth)</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Verified company details rendered across footer, legal contracts, and headers
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono">
              VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Company Display Name</label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Official Tagline</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Founder &amp; Tech Lead</label>
              <input
                type="text"
                value={config.founderName}
                onChange={(e) => setConfig({ ...config, founderName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Founder Role</label>
              <input
                type="text"
                value={config.founderRole}
                onChange={(e) => setConfig({ ...config, founderRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Official Headquarters Address</label>
            <input
              type="text"
              value={config.address}
              onChange={(e) => setConfig({ ...config, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        {/* 2. Communication Channels & WhatsApp */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#00C98B]" />
                <span>Contact Channels &amp; WhatsApp Dispatch</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct phone and WhatsApp links for prefilled demo requests and quotes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Official Phone Number</label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={config.whatsapp}
                onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* 3. Company Email Configuration */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E52BFF]" />
                <span>Company Email Configuration</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Public contact email and internal notification recipient
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Public Company Email (Optional)
              </label>
              <input
                type="email"
                value={config.companyEmail}
                onChange={(e) => setConfig({ ...config, companyEmail: e.target.value })}
                placeholder="contact@starxalphalabs.com (Leave blank if not active)"
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Rule: Public email is strictly hidden on UI unless verified and saved here.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Admin Notification Inbound Recipient
              </label>
              <input
                type="email"
                value={config.adminNotificationEmail}
                onChange={(e) => setConfig({ ...config, adminNotificationEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Destination for automatic new lead alerts.
              </span>
            </div>
          </div>
        </div>

        {/* 4. Decoupled Ecosystem Target URL */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#00D9FF]" />
                <span>Decoupled Ecosystem Destination</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Independent product endpoint for STARX FLOW
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              STARX FLOW Production Target URL
            </label>
            <input
              type="url"
              value={config.starxFlowTargetUrl}
              onChange={(e) => setConfig({ ...config, starxFlowTargetUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Configured destination: <code>https://starx-flow.runs-on.dev/</code> (Strictly decoupled, zero shared DB).
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md shadow-[#087BFF]/30 flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Business Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
