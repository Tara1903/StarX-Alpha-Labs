"use client";

import React from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Users,
  UserCheck,
  Shield,
  Truck,
  Briefcase,
  TrendingUp,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface RoleOption {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const ROLES: RoleOption[] = [
  {
    id: "end-customers",
    title: "End Consumers & Shoppers",
    tagline: "Customer-facing interface",
    description: "Public registration, product discovery, checkout, self-service account portal, and order history.",
    icon: Users,
  },
  {
    id: "b2b-clients",
    title: "B2B Clients & Corporate Accounts",
    tagline: "Enterprise buyers & procurement",
    description: "Multi-seat corporate accounts, purchase order approvals, credit limits, and custom invoices.",
    icon: Briefcase,
  },
  {
    id: "system-admins",
    title: "System Administrators",
    tagline: "Full platform control",
    description: "Global system configuration, user role provisioning, security policies, and audit logs.",
    icon: Shield,
  },
  {
    id: "operational-staff",
    title: "Operations & Field Staff",
    tagline: "Internal operational team",
    description: "Warehouse pickers, dispatch operators, customer support agents, and field technicians.",
    icon: Truck,
  },
  {
    id: "external-vendors",
    title: "Vendors & Marketplace Sellers",
    tagline: "Third-party partner portal",
    description: "Inventory listings, payout accounts, shipping label generation, and order fulfillment.",
    icon: UserCheck,
  },
  {
    id: "executive-leadership",
    title: "Executive & Leadership",
    tagline: "High-level analytics",
    description: "Read-only executive analytics dashboards, revenue projections, and automated PDF summaries.",
    icon: TrendingUp,
  },
];

export function Step8Users() {
  const { state, setUserRoles, nextStep } = useDesignStudio();
  const selectedRoles = state.userRoles || ["end-customers", "system-admins"];

  const toggleRole = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      if (selectedRoles.length === 1) return;
      setUserRoles(selectedRoles.filter((r) => r !== roleId));
    } else {
      setUserRoles([...selectedRoles, roleId]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 8 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Who Is This Solution For?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Identify the personas who will use your software. We will architect separate authentication guards and screen viewports for each group.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROLES.map((role) => {
          const isSelected = selectedRoles.includes(role.id);
          const Icon = role.icon;

          return (
            <div
              key={role.id}
              onClick={() => toggleRole(role.id)}
              className={`group relative rounded-xl p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_20px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                        : "bg-white/5 text-zinc-400 border border-white/10 group-hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {isSelected ? "Active Persona" : "Available"}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/80 mt-0.5">
                    {role.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300">
                  {isSelected ? "Included in Scope" : "Include Role"}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold"
                      : "border border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architectural Separation Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Dedicated Internal vs. Customer Portals
          </h4>
          <p className="text-xs text-zinc-400 max-w-xl">
            Having separate customer and administrative portals provides maximum security, prevents data leaks, and allows custom tailored navigation bars for each user group.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
          <Check className="w-4 h-4" />
          <span>Multi-Tenant RBAC Active</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected: <strong className="text-white">{selectedRoles.length} User Personas</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={selectedRoles.length === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Choose Features</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
