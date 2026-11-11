"use client";

import React from "react";
import { CustomerSessionContext } from "@/types/customerPortal";
import { 
  UserCheck, 
  Mail, 
  ShieldCheck, 
  KeyRound, 
  BellRing, 
  CheckCircle2 
} from "lucide-react";

interface AccountModuleProps {
  session: CustomerSessionContext | null;
  onSignOut: () => void;
}

export function AccountModule({
  session,
  onSignOut,
}: AccountModuleProps) {
  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Client Account &amp; Security Settings</h2>
          <p className="text-xs text-slate-400">Authenticated profile credentials and workspace preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Profile Details */}
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
            <UserCheck className="w-4 h-4 text-[#00D9FF]" />
            <span>Personal Profile</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="text-slate-400 font-mono">Full Name</div>
              <div className="text-sm font-bold text-white">{session?.user.fullName}</div>
            </div>

            <div>
              <div className="text-slate-400 font-mono">Authenticated Email</div>
              <div className="text-sm font-bold text-white font-mono">{session?.user.email}</div>
            </div>

            <div>
              <div className="text-slate-400 font-mono">Workspace Role</div>
              <div className="text-sm font-bold text-[#00D9FF] uppercase">{session?.membership.role}</div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#00C98B]" />
            <span>Security &amp; Encryption</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
              <span>TLS 1.3 End-to-End Encryption Active</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
              <span>Row Level Security (RLS) Tenant Isolation</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
              <span>Session Managed via Secure HTTP-Only Cookies</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onSignOut}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
              >
                Sign Out of Workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
