"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DemoModel } from "@/types/demo";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import { VideoModal } from "@/components/demos/VideoModal";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  ExternalLink, 
  Video, 
  Cpu, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Building, 
  KeyRound, 
  RotateCcw, 
  Globe, 
  WifiOff, 
  Share2, 
  QrCode,
  Tag,
  ChevronRight,
  Database,
  Lock,
  ChevronDown
} from "lucide-react";

interface DemoDetailClientProps {
  demo: DemoModel;
  relatedDemos: DemoModel[];
}

const ACTIVE_SANDBOX_SLUGS = [
  // Category 01 — Food & Hospitality Complete 20-Product Suite
  "restaurant-management-system",
  "restaurant-pos-billing",
  "cloud-kitchen-management",
  "cafe-management-system",
  "bakery-management-system",
  "food-delivery-management",
  "table-reservation-booking",
  "hotel-restaurant-management",
  "catering-business-management",
  "food-truck-management",
  "bar-pub-management",
  "qsr-management",
  "grocery-fresh-food-ordering",
  "food-inventory-supply-management",
  "luxe-dining-brand-experience",
  "chef-curated-food-subscription",
  "crave-native-android-ios-ordering-app",
  "grand-palace-hotel-guest-portal",
  "gourmet-artisan-catering-marketplace",
  "omni-hospitality-digital-ecosystem",
  // Additional Flagships
  "ecommerce-storefront",
  "multi-vendor-marketplace",
  "online-fashion-boutique",
];

export function DemoDetailClient({ demo, relatedDemos }: DemoDetailClientProps) {
  const { t } = useLanguage();
  const [videoOpen, setVideoOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/demos" className="hover:text-white transition-colors">Demos</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/demos/${demo.categorySlug}`} className="hover:text-white transition-colors">
              {demo.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#73D8FF] font-medium">{demo.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={copyShareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-xs text-slate-300 font-medium border border-[#1A3D68] transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#32A9E8]" />
              <span>{copiedLink ? "Link Copied!" : "Share Demo"}</span>
            </button>
            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-xs text-slate-300 font-medium border border-[#1A3D68] transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>QR Mobile</span>
            </button>
            <Link
              href={`/demos/${demo.categorySlug}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#32A9E8] hover:text-[#73D8FF] transition-colors ml-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Category</span>
            </Link>
          </div>
        </div>

        {/* QR Code Quick Modal Drawer */}
        {showQr && (
          <div className="p-4 rounded-2xl bg-[#0A172B] border border-[#173863] flex items-center justify-between gap-4 max-w-md mx-auto animate-fadeIn">
            <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
              {/* QR representation */}
              <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center text-[9px] font-mono font-bold text-black text-center">
                SCAN DEMO
              </div>
            </div>
            <div className="text-xs space-y-1">
              <div className="font-bold text-white">Scan on Mobile Device</div>
              <p className="text-slate-300 text-[11px]">
                Instantly load this demo environment on your smartphone browser or tablet.
              </p>
              <div className="text-[10px] text-emerald-400 font-mono">HTTPS Live Tunnel Ready</div>
            </div>
          </div>
        )}

        {/* Top Hero Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#091527] via-[#0B1A30] to-[#07111F] border border-[#1E4373] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Title, Description, Tags */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/50">
                  Model #{demo.id}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    demo.availabilityStatus === "Live Demo"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      demo.availabilityStatus === "Live Demo" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                    }`}
                  />
                  {demo.availabilityStatus}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#0F243E] text-slate-300 border border-[#1A3D68]">
                  {demo.developmentType} &bull; {demo.platform}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {demo.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {demo.fullDescription}
              </p>

              {/* Suitable For */}
              <div className="p-3.5 rounded-2xl bg-[#050D1A]/70 border border-[#143054] flex items-start gap-3">
                <Building className="w-5 h-5 text-[#32A9E8] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-white mb-0.5">Recommended Business Types:</div>
                  <div className="text-slate-300 leading-relaxed">{demo.suitableFor}</div>
                </div>
              </div>

              {/* Action Buttons Group */}
              <div className="pt-2 flex flex-wrap gap-3">
                {/* 1. View Live Demo or Interactive Sandbox */}
                {demo.availabilityStatus === "Live Demo" || ACTIVE_SANDBOX_SLUGS.includes(demo.slug) ? (
                  <Link
                    href={`/demos/${demo.categorySlug}/${demo.slug}/live`}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#1F7ECB] hover:from-[#1E7ECA] hover:to-[#32A9E8] text-white font-bold text-sm shadow-xl shadow-[#1769AA]/40 flex items-center gap-2 border border-[#32A9E8]/50 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-[#73D8FF]" />
                    <span>
                      {demo.availabilityStatus === "Live Demo"
                        ? "Launch Live Demo Environment"
                        : "Launch Interactive Sandbox"}
                    </span>
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="px-6 py-3.5 rounded-xl bg-[#0B192E] text-amber-300 font-semibold text-sm border border-amber-500/30 flex items-center gap-2 cursor-not-allowed select-none"
                  >
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Interactive Sandbox Under Development</span>
                  </span>
                )}

                {/* 2. Watch Demo Video */}
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-white font-semibold text-sm border border-[#1D406E] flex items-center gap-2 transition-all"
                >
                  <Video className="w-4 h-4 text-rose-400" />
                  <span>Watch Walkthrough ({demo.videoDuration})</span>
                </button>

                {/* 4. Request Customization */}
                <button
                  type="button"
                  onClick={() => setCustomizationOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-[#261F0E]/80 hover:bg-[#362C15] text-amber-300 font-semibold text-sm border border-amber-500/30 flex items-center gap-2 transition-all"
                >
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Request Customization</span>
                </button>

                {/* 5. Get Quotation */}
                <Link
                  href={`/get-quote?demo=${demo.slug}`}
                  className="px-5 py-3.5 rounded-xl bg-[#0A172B] hover:bg-[#122442] text-[#73D8FF] font-semibold text-sm border border-[#32A9E8]/30 flex items-center gap-2 transition-all"
                >
                  <FileText className="w-4 h-4 text-[#32A9E8]" />
                  <span>Generate Quotation</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Commercial & Technical Spec Card */}
            <div className="bg-[#050D1A] rounded-2xl border border-[#163359] p-6 space-y-5">
              <div className="border-b border-[#143054] pb-4">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  Commercial Estimation
                </span>
                <div className="text-3xl font-extrabold text-[#73D8FF]">
                  {demo.indicativeStartingPrice}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Global Client Benchmark: {demo.indicativePriceUsd}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-[#143054]">
                  <span className="text-slate-400">Est. Production Time:</span>
                  <span className="font-semibold text-white">{demo.estimatedDevelopmentTime}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#143054]">
                  <span className="text-slate-400">Architecture Mode:</span>
                  <span className="font-semibold text-white">{demo.platform}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#143054]">
                  <span className="text-slate-400">Security Standard:</span>
                  <span className="font-semibold text-emerald-400">Enterprise RLS & Audit</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#143054]">
                  <span className="text-slate-400">Offline Ready:</span>
                  <span className="font-semibold text-cyan-400">
                    {demo.offlineReady ? "Yes • Local SQLite Sync" : "Cloud-First Architecture"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Integrated Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {demo.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#091527] text-slate-300 border border-[#173863]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Standard Demo Architecture (10 Pillars) */}
        <section id="features" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#32A9E8]" />
                <span>Enterprise Feature & Module Breakdown</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Architectural components included in the StarX Alpha Labs production delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demo.modules.map((mod, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#091527] border border-[#163359] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#102D50] text-[#73D8FF]">
                    Module #{i + 1}
                  </span>
                  <div className="flex gap-1">
                    {mod.roles.map((r) => (
                      <span key={r} className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#06101E] text-slate-400 border border-[#143054]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{mod.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>

                <div className="pt-3 border-t border-[#132B4C] space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Core Functionalities:
                  </span>
                  <ul className="space-y-1.5">
                    {mod.keyFeatures.map((kf, k) => (
                      <li key={k} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safe Sample Login Credentials & Role Personas */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#091527] border border-[#163359] space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero-Risk Demonstration Credentials
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Multi-Role Demo Test Accounts
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Test how the application adapts for different user types. In the Live Sandbox, you can switch personas with one click.
              </p>
            </div>
            {demo.availabilityStatus === "Live Demo" || ACTIVE_SANDBOX_SLUGS.includes(demo.slug) ? (
              <Link
                href={`/demos/${demo.categorySlug}/${demo.slug}/live`}
                className="px-4 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#1E7ECA] flex items-center gap-1.5"
              >
                <span>Test Roles in Live Sandbox</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-xl bg-[#0B192E] text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Sandbox Coming Soon</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demo.sampleRoles.map((roleAcc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#050D1A] border border-[#143054] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#32A9E8]" />
                    {roleAcc.label}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#102D50] text-[#73D8FF]">
                    {roleAcc.role}
                  </span>
                </div>

                <div className="text-xs space-y-1 font-mono text-slate-300 bg-[#081324] p-2.5 rounded-lg border border-[#132B4C]">
                  <div>Email: <strong className="text-white">{roleAcc.email}</strong></div>
                  <div>Password: <strong className="text-slate-400">{roleAcc.passwordHint}</strong></div>
                </div>

                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Allowed: </span>
                  {roleAcc.permissions.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Online & Offline Capabilities */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#081324] border border-[#163359] space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Globe className="w-4 h-4" />
              <span>Online Hosted Environment</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hosted on high-speed edge cloud infrastructure with real-time Supabase PostgreSQL synchronization, automated webhooks, and SSL encryption. Public visitors can safely evaluate full functional flows without risking production databases.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#081324] border border-[#163359] space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <WifiOff className="w-4 h-4" />
              <span>Offline Ready Architecture</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Engineered with offline data resilience. Core operational states can synchronize with local SQLite stores. External cloud payment gateways and third-party SMS APIs clearly distinguish network connectivity requirements.
            </p>
          </div>
        </section>

        {/* Related Demos in this Category */}
        {relatedDemos.length > 0 && (
          <section className="space-y-4 pt-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#32A9E8]" />
              <span>Other Models in {demo.categoryName}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedDemos.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/demos/${rel.categorySlug}/${rel.slug}`}
                  className="p-4 rounded-2xl bg-[#091527] hover:bg-[#0E203B] border border-[#163359] hover:border-[#32A9E8]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#73D8FF]">#{rel.id} &bull; {rel.developmentType}</span>
                    <h3 className="text-sm font-bold text-white mt-1 mb-2 hover:text-[#73D8FF] leading-snug">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#132B4C] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#73D8FF]">{rel.indicativeStartingPrice}</span>
                    <span className="text-[#32A9E8] font-medium flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <VideoModal
        demo={demo}
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <CustomizationModal
        demo={demo}
        isOpen={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
      />
    </div>
  );
}
