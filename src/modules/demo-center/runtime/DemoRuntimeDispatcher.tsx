"use client";

import React from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../types";
import { RestaurantManagementPilotApp } from "../pilots/RestaurantManagementPilotApp";
import { ArrowLeft, CheckCircle2, Clock, Layers, ShieldCheck, Sparkles, Wrench } from "lucide-react";

interface DemoRuntimeDispatcherProps {
  product: DemoProductDefinition;
}

/**
 * Runtime dispatcher for genuinely implemented & verified StarX Forge applications.
 * Generic archetype mock templates have been permanently removed; any entry without a
 * dedicated implementation renders an honest build-pending engineering specification view.
 */
export function DemoRuntimeDispatcher({ product }: DemoRuntimeDispatcherProps) {
  if (product.slug === "restaurant-management-pilot") {
    return <RestaurantManagementPilotApp product={product} />;
  }

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
            <span>Back to Solution Specification</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>In Development • StarX Forge Queue</span>
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

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-100">
            <Wrench className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-200 mb-0.5">
                Dedicated Interactive Build Pending
              </div>
              <p className="text-amber-100/80 leading-relaxed">
                This canonical solution is registered for custom Stitch UI design and Antigravity engineering through StarX Forge. It has not yet been generated or published, so no simulated or placeholder runtime is shown here.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#050D1A] border border-[#143054] space-y-2.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#32A9E8]" />
                <span>Planned Key Capabilities</span>
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
                <span>Engineering Workflow Contract</span>
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
              <span>Zero fake templates • Verified build required prior to public release</span>
            </span>
            <Link
              href={`/get-quote?demo=${product.slug}`}
              className="px-4 py-2 rounded-xl bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-semibold"
            >
              Request Early Custom Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
