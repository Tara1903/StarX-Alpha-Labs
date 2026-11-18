"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Search,
  CreditCard,
  MessageSquare,
  KeyRound,
  Database,
  Briefcase,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface IntegrationItem {
  id: string;
  category: "payments" | "messaging" | "auth" | "storage" | "enterprise" | "maps";
  name: string;
  tagline: string;
  badge?: string;
}

const INTEGRATIONS_CATALOG: IntegrationItem[] = [
  // Payments
  { id: "stripe", category: "payments", name: "Stripe", tagline: "Global credit cards, Apple Pay & subscription billing", badge: "Global" },
  { id: "razorpay", category: "payments", name: "Razorpay & UPI", tagline: "UPI QR, NetBanking, and Indian cards", badge: "India & SE Asia" },
  { id: "paypal", category: "payments", name: "PayPal", tagline: "Global digital wallet checkout and recurring payments" },

  // Messaging
  { id: "resend", category: "messaging", name: "Resend / SendGrid", tagline: "Transactional emails, receipts & password reset delivery", badge: "Recommended" },
  { id: "twilio", category: "messaging", name: "Twilio (SMS & WhatsApp)", tagline: "Phone OTPs, WhatsApp booking alerts & notifications" },
  { id: "firebase-fcm", category: "messaging", name: "Firebase Cloud Messaging", tagline: "Real-time push notifications across iOS, Android & Web" },

  // Auth & Identity
  { id: "google-auth", category: "auth", name: "Google OAuth 2.0", tagline: "One-tap sign-in with Google accounts", badge: "Most Popular" },
  { id: "apple-auth", category: "auth", name: "Apple Sign-In", tagline: "Mandatory for iOS App Store submission with privacy relay" },
  { id: "okta-azure-sso", category: "auth", name: "Okta & Azure AD SSO", tagline: "Enterprise SAML 2.0 / OpenID Connect single sign-on", badge: "Enterprise" },

  // Storage
  { id: "supabase-storage", category: "storage", name: "Supabase S3 Storage", tagline: "Encrypted object storage with cryptographic signed URLs", badge: "Default" },
  { id: "aws-s3", category: "storage", name: "Amazon S3 & CloudFront", tagline: "High-volume media storage and global CDN caching" },
  { id: "cloudflare-r2", category: "storage", name: "Cloudflare R2", tagline: "Zero-egress fee object storage for large assets" },

  // Enterprise
  { id: "salesforce", category: "enterprise", name: "Salesforce & HubSpot", tagline: "Two-way contact and deal pipeline synchronization" },
  { id: "quickbooks", category: "enterprise", name: "QuickBooks & Xero", tagline: "Automated ledger, tax compliance and invoice sync" },
  { id: "zapier-make", category: "enterprise", name: "Zapier & Webhooks", tagline: "Event-driven outgoing webhook triggers to 5,000+ apps" },

  // Maps
  { id: "google-maps", category: "maps", name: "Google Maps Platform", tagline: "Places autocomplete, geocoding and live routing", badge: "Turn-by-Turn" },
  { id: "mapbox", category: "maps", name: "Mapbox", tagline: "Custom vector map styles and spatial telemetry" },
];

const CATEGORIES = [
  { id: "all", label: "All Integrations", icon: Database },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "messaging", label: "Messaging", icon: MessageSquare },
  { id: "auth", label: "Auth & SSO", icon: KeyRound },
  { id: "enterprise", label: "Enterprise CRM", icon: Briefcase },
  { id: "maps", label: "Maps & Geolocation", icon: MapPin },
];

export function Step10Integrations() {
  const { state, setIntegrations, nextStep } = useDesignStudio();
  const selected = state.integrations || ["stripe", "resend", "google-auth", "supabase-storage"];
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleIntegration = (id: string) => {
    if (selected.includes(id)) {
      setIntegrations(selected.filter((i: string) => i !== id));
    } else {
      setIntegrations([...selected, id]);
    }
  };

  const filtered = INTEGRATIONS_CATALOG.filter((item) => {
    if (activeTab !== "all" && item.category !== activeTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 10 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          How Should Everything Work Together?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Choose the third-party platforms and API connectors your solution requires. StarX handles end-to-end token security, webhook dispatching, and sandboxing.
        </p>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => {
          const isSelected = selected.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleIntegration(item.id)}
              className={`group relative rounded-xl p-4 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_18px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 leading-snug">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-300">
                  {isSelected ? "Connector Active" : "Add Connector"}
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

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Active Connectors: <strong className="text-white">{selected.length} Third-Party Services</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Continue to Project Scale & Requirements</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
