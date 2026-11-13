"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DemoProductDefinition } from "../types";
import { ArrowLeft, CheckCircle2, Clock, Layers, ShieldCheck, Sparkles, Wrench } from "lucide-react";

function ForgeRuntimeLoading() {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-200 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-9 h-9 rounded-full border-2 border-[#32A9E8]/30 border-t-[#32A9E8] animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading interactive demo runtime...</p>
      </div>
    </div>
  );
}

// 5 Surviving Flagship Demonstrations + Protected Pilot
const RestaurantManagementPilotApp = dynamic(
  () => import("../pilots/RestaurantManagementPilotApp").then((m) => m.RestaurantManagementPilotApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const FoodDeliveryDispatchApp = dynamic(
  () => import("../demos/cat01/FoodDeliveryDispatchApp").then((m) => m.FoodDeliveryDispatchApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const SnapServeQsrApp = dynamic(
  () => import("../demos/cat01/SnapServeQsrApp").then((m) => m.SnapServeQsrApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const AuraDirectEcommerceApp = dynamic(
  () => import("../demos/cat02/AuraDirectEcommerceApp").then((m) => m.AuraDirectEcommerceApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const NexusMarketplaceApp = dynamic(
  () => import("../demos/cat02/NexusMarketplaceApp").then((m) => m.NexusMarketplaceApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const MaisonEpureBoutiqueApp = dynamic(
  () => import("../demos/cat02/MaisonEpureBoutiqueApp").then((m) => m.MaisonEpureBoutiqueApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const LuxeDiningExperienceApp = dynamic(
  () => import("../demos/cat01/LuxeDiningExperienceApp").then((m) => m.LuxeDiningExperienceApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const GrandPalaceGuestPortalApp = dynamic(
  () => import("../demos/cat01/GrandPalaceGuestPortalApp").then((m) => m.GrandPalaceGuestPortalApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const ChefCuratedSubscriptionApp = dynamic(
  () => import("../demos/cat01/ChefCuratedSubscriptionApp").then((m) => m.ChefCuratedSubscriptionApp),
  { loading: () => <ForgeRuntimeLoading /> }
);

interface DemoRuntimeDispatcherProps {
  product: DemoProductDefinition;
}

/**
 * Runtime dispatcher for active StarX Forge customer-facing applications.
 * Following the portfolio reset, only the 5 surviving flagships and the Maison Ember
 * pilot are active. All other concepts display an honest build-pending engineering view.
 */
export function DemoRuntimeDispatcher({ product }: DemoRuntimeDispatcherProps) {
  // 1. Protected Pilot (Maison Ember)
  if (product.slug === "restaurant-management-pilot") {
    return <RestaurantManagementPilotApp product={product} />;
  }

  // 2. Demo #06 — Real-Time Food Delivery Dispatch & Radar Telemetry
  if (product.slug === "food-delivery-management") {
    return <FoodDeliveryDispatchApp product={product} />;
  }

  // 3. Demo #12 — QSR Self-Service Ordering Kiosk & Kitchen Token Screen
  if (product.slug === "qsr-management") {
    return <SnapServeQsrApp product={product} />;
  }

  // 4. Demo #23 — LuxeCart D2C Brand E-Commerce Storefront
  if (product.slug === "ecommerce-storefront") {
    return <AuraDirectEcommerceApp product={product} />;
  }

  // 5. Demo #24 — OmniBazaar Multi-Vendor Marketplace & Seller Onboarding
  if (product.slug === "multi-vendor-marketplace") {
    return <NexusMarketplaceApp product={product} />;
  }

  // 6. Demo #25 — Maison Soie Haute Couture Fashion Boutique & Interactive Lookbook
  if (product.slug === "online-fashion-boutique") {
    return <MaisonEpureBoutiqueApp product={product} />;
  }

  // 7. Demo #161 — Luxe Dining Brand Storytelling Website (Aurelia)
  if (product.slug === "luxe-dining-brand-experience") {
    return <LuxeDiningExperienceApp product={product} />;
  }

  // 8. Demo #164 — Grand Palace Hotel Guest Experience Portal
  if (product.slug === "grand-palace-hotel-guest-portal") {
    return <GrandPalaceGuestPortalApp product={product} />;
  }

  // 9. Demo #162 — Chef-Curated Meal Subscription Platform
  if (product.slug === "chef-curated-food-subscription") {
    return <ChefCuratedSubscriptionApp product={product} />;
  }

  // All other concepts fall through to honest pending implementation view
  return <ForgePendingImplementationView product={product} />;
}

function ForgePendingImplementationView({ product }: DemoRuntimeDispatcherProps) {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#32A9E8] hover:text-[#73D8FF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Solution Blueprint</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Customer-Facing Product • In Planning & Design</span>
          </span>
        </div>

        <div className="p-8 rounded-3xl bg-[#091527] border border-[#173863] space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40">
              Model #{product.id}
            </span>
            <span className="text-xs font-semibold text-[#32A9E8]">{product.categoryName}</span>
            {product.productType && (
              <span className="text-xs font-mono text-slate-400">• {product.productType}</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {product.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {product.fullDescription}
          </p>

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3 text-xs text-cyan-100">
            <Sparkles className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-cyan-200 mb-0.5">
                Strategic Digital Product Architecture
              </div>
              <p className="text-cyan-100/80 leading-relaxed">
                StarX Alpha Labs is engineering this solution as a complete, customer-facing digital product (responsive web app, online storefront, or mobile experience) designed for client deployment, rather than an internal admin dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#050D1A] border border-[#143054] space-y-2.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#32A9E8]" />
                <span>Customer-Facing Capabilities</span>
              </div>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#050D1A] border border-[#143054] space-y-2.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#32A9E8]" />
                <span>Primary User Journeys</span>
              </div>
              <ul className="space-y-2">
                {product.workflows.map((wf) => (
                  <li key={wf.id} className="text-xs text-slate-300">
                    <div className="font-semibold text-white">{wf.title}</div>
                    <div className="text-slate-400">{wf.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#143054] text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero placeholder screens • Verified custom engineering prior to live release</span>
            </span>
            <Link
              href={`/get-quote?demo=${product.slug}`}
              className="px-4 py-2 rounded-xl bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-semibold"
            >
              Request Custom Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
