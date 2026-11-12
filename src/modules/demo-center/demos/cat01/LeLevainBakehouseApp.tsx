"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cake,
  CheckCircle2,
  Flame,
  Plus,
  RotateCcw,
  Scale,
  Sparkles,
  Store,
  Timer,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface OvenBatch {
  id: string;
  deck: string;
  title: string;
  tempLabel: string;
  hydrationOrYield: string;
  stage: "Proofing" | "Baking" | "Cooling" | "Boutique Ready";
  progressPct: number;
}

interface CustomCakeOrder {
  id: string;
  refNo: string;
  clientName: string;
  tiers: 1 | 2 | 3;
  sponge: string;
  filling: string;
  inscription: string;
  pickupDate: string;
  price: number;
  allergens: string[];
  status: "Tasting Approved" | "Baking Sponge" | "Crumb Coat" | "Ready for Pickup";
}

interface RecipeFormula {
  id: string;
  title: string;
  allergens: string[];
  ingredients: { name: string; gramsPer1x: number }[];
}

interface CounterRackItem {
  id: string;
  name: string;
  shelfLifeHours: number;
  onDisplay: number;
  soldToday: number;
  price: number;
}

interface BakeryState {
  bakeryName: string;
  batches: OvenBatch[];
  cakes: CustomCakeOrder[];
  recipes: RecipeFormula[];
  counterItems: CounterRackItem[];
}

const LE_LEVAIN_SEED: BakeryState = {
  bakeryName: "Le Levain Bakehouse",
  batches: [
    { id: "ob-1", deck: "DECK 1 • UPPER HEARTH", title: "Country Sourdough Boules (82% Hydration)", tempLabel: "245°C • 45s Steam", hydrationOrYield: "36 Loaves (850g)", stage: "Baking", progressPct: 84 },
    { id: "ob-2", deck: "DECK 3 • CONVECTION", title: "AOP Charentes Butter Croissants", tempLabel: "195°C • 27 Folds", hydrationOrYield: "96 Viennoiseries", stage: "Cooling", progressPct: 92 },
    { id: "ob-3", deck: "DECK 4 • PROOFER", title: "Malted Honey Brioche Nanterre", tempLabel: "28°C / 82% RH", hydrationOrYield: "22 Loaves", stage: "Proofing", progressPct: 58 },
  ],
  cakes: [
    { id: "ck-1", refNo: "#LVN-8924", clientName: "Kapoor Anniversary", tiers: 3, sponge: "Madagascar Vanilla Génoise", filling: "Morello Cherry & Swiss Meringue", inscription: "25 Golden Years", pickupDate: "2026-11-14", price: 11800, allergens: ["Dairy", "Gluten", "Eggs"], status: "Crumb Coat" },
    { id: "ck-2", refNo: "#LVN-8929", clientName: "Oberoi Gallery Gala", tiers: 2, sponge: "Valrhona 70% Guanaja", filling: "Passionfruit Curd & Ganache", inscription: "Opening Night", pickupDate: "2026-11-15", price: 7600, allergens: ["Dairy", "Gluten"], status: "Tasting Approved" },
  ],
  recipes: [
    {
      id: "rec-1",
      title: "Country Sourdough Hearth Dough",
      allergens: ["Wheat Gluten"],
      ingredients: [
        { name: "T65 French Bread Flour", gramsPer1x: 4200 },
        { name: "Wholegrain Khorasan", gramsPer1x: 800 },
        { name: "Wild Levain Starter (18%)", gramsPer1x: 900 },
        { name: "Filtered Water", gramsPer1x: 4100 },
        { name: "Guérande Sea Salt", gramsPer1x: 105 },
      ],
    },
    {
      id: "rec-2",
      title: "Laminated Croissant Détrempe",
      allergens: ["Wheat Gluten", "Dairy Butter", "Eggs"],
      ingredients: [
        { name: "High-Protein Pastry Flour", gramsPer1x: 3500 },
        { name: "Charentes-Poitou Cultured Butter", gramsPer1x: 1850 },
        { name: "Whole Milk", gramsPer1x: 1450 },
        { name: "Organic Cane Sugar", gramsPer1x: 380 },
      ],
    },
  ],
  counterItems: [
    { id: "ci-1", name: "Sourdough Country Boule", shelfLifeHours: 36, onDisplay: 18, soldToday: 24, price: 320 },
    { id: "ci-2", name: "Pain au Chocolat (Valrhona)", shelfLifeHours: 14, onDisplay: 22, soldToday: 41, price: 240 },
    { id: "ci-3", name: "Cardamom Pistachio Morning Bun", shelfLifeHours: 12, onDisplay: 14, soldToday: 31, price: 260 },
    { id: "ci-4", name: "Raspberry Rose Pavlova (Solo)", shelfLifeHours: 8, onDisplay: 7, soldToday: 15, price: 390 },
  ],
};

export function LeLevainBakehouseApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<BakeryState>(
    product.slug,
    LE_LEVAIN_SEED
  );

  const [tab, setTab] = useState<"ovens" | "cakes" | "scaler" | "counter">("ovens");
  const [scaleMultiplier, setScaleMultiplier] = useState<1 | 2 | 5>(1);
  const [selectedRecipeId, setSelectedRecipeId] = useState(state.recipes[0]?.id || "rec-1");
  const [cakeTiers, setCakeTiers] = useState<1 | 2 | 3>(2);
  const [cakeSponge, setCakeSponge] = useState("Madagascar Vanilla Génoise");
  const [cakeFilling, setCakeFilling] = useState("Morello Cherry & Swiss Meringue");
  const [cakeClient, setCakeClient] = useState("");
  const [cakeInscription, setCakeInscription] = useState("");
  const [cakeError, setCakeError] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const calculatedCakePrice = cakeTiers * 3600 + (cakeSponge.includes("Pistachio") ? 900 : 400);

  const advanceBatch = (batchId: string) => {
    const nextStage: Record<OvenBatch["stage"], OvenBatch["stage"]> = {
      Proofing: "Baking",
      Baking: "Cooling",
      Cooling: "Boutique Ready",
      "Boutique Ready": "Boutique Ready",
    };
    setState((prev) => ({
      ...prev,
      batches: prev.batches.map((b) =>
        b.id === batchId
          ? { ...b, stage: nextStage[b.stage], progressPct: Math.min(100, b.progressPct + 20) }
          : b
      ),
    }));
    notify("Oven deck batch stage advanced.");
  };

  const handleBookCake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cakeClient.trim()) {
      setCakeError("Client or event name is required.");
      return;
    }
    const created: CustomCakeOrder = {
      id: `ck-${Date.now()}`,
      refNo: `#LVN-${Math.floor(8940 + Math.random() * 900)}`,
      clientName: cakeClient.trim(),
      tiers: cakeTiers,
      sponge: cakeSponge,
      filling: cakeFilling,
      inscription: cakeInscription.trim() || "Custom Plaquette",
      pickupDate: "2026-11-18",
      price: calculatedCakePrice,
      allergens: cakeSponge.includes("Pistachio") ? ["Nuts", "Dairy", "Gluten", "Eggs"] : ["Dairy", "Gluten", "Eggs"],
      status: "Tasting Approved",
    };
    setState((prev) => ({ ...prev, cakes: [created, ...prev.cakes] }));
    setCakeClient("");
    setCakeInscription("");
    setCakeError("");
    notify(`Booked custom cake ${created.refNo} for ${created.clientName}.`);
  };

  const selectedRecipe = useMemo(
    () => state.recipes.find((r) => r.id === selectedRecipeId) || state.recipes[0],
    [state.recipes, selectedRecipeId]
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1E1B16] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E0BEC4] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#FFF8F0] border border-[#E0BEC4] text-[#594046]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <span className="font-serif font-bold text-base text-[#970046]">{state.bakeryName}</span>
            <p className="text-[11px] text-[#594046]">
              Proofer 28°C / 82% RH • {state.batches.length} Active Decks • {state.cakes.length} Custom Commissions
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1.5">
          {[
            { id: "ovens", label: "Oven Production Sheets" },
            { id: "cakes", label: `Custom Cake Studio (${state.cakes.length})` },
            { id: "scaler", label: "Recipe Scaler & Allergens" },
            { id: "counter", label: "Counter & Shelf-Life" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                tab === item.id
                  ? "bg-[#970046] text-white"
                  : "bg-[#FFF8F0] border border-[#E0BEC4] text-[#594046]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Bakehouse production sheets reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E0BEC4] bg-white text-xs text-[#594046] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFD9E0] text-[#970046] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: OVEN PRODUCTION SHEETS + BESPOKE CAKE STUDIO SPLIT */}
      {tab === "ovens" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#970046]">
                Real-Time Hearth Rotation
              </span>
              <h1 className="font-serif text-xl font-bold">Morning Deck-Oven Bake Sheets</h1>
            </div>

            {state.batches.map((b) => (
              <div key={b.id} className="rounded-2xl border border-[#E0BEC4] bg-white p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#904D00]">
                    {b.deck}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFD9E0] text-[#970046]">
                    {b.stage}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold">{b.title}</h2>
                <div className="flex flex-wrap gap-4 text-xs text-[#594046]">
                  <span>Temp: {b.tempLabel}</span>
                  <span>Yield: {b.hydrationOrYield}</span>
                </div>
                <div className="h-2 rounded-full bg-[#F4EDE3] overflow-hidden">
                  <div className="h-full bg-[#970046]" style={{ width: `${b.progressPct}%` }} />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => advanceBatch(b.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#904D00] hover:bg-[#6E3900] text-white text-xs font-semibold cursor-pointer"
                  >
                    {b.stage === "Boutique Ready" ? "Batch on Boutique Shelf ✓" : "Advance Bake Stage →"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Quick Tiered Cake Intake Builder */}
          <aside className="xl:col-span-5 rounded-2xl border border-[#E0BEC4] bg-white p-5 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#970046]">
                Custom Pâtisserie Atelier
              </span>
              <h2 className="font-serif text-lg font-bold">Tiered Cake Studio & Order Intake</h2>
            </div>

            <form onSubmit={handleBookCake} className="space-y-3.5 text-xs">
              {cakeError && <p className="text-rose-700 bg-rose-50 p-2 rounded">{cakeError}</p>}

              <div>
                <p className="font-bold text-[#594046] mb-1.5">Tier Architecture</p>
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 3] as const).map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => setCakeTiers(tr)}
                      className={`py-2 rounded-lg border font-bold cursor-pointer ${
                        cakeTiers === tr
                          ? "border-[#970046] bg-[#FFD9E0]/50 text-[#970046]"
                          : "border-[#E0BEC4] bg-[#FFF8F0]"
                      }`}
                    >
                      {tr} Tier{tr > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-[#594046] mb-1.5">Sponge Base</p>
                <select
                  value={cakeSponge}
                  onChange={(e) => setCakeSponge(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E0BEC4] bg-[#FFF8F0]"
                >
                  <option value="Madagascar Vanilla Génoise">Madagascar Vanilla Génoise</option>
                  <option value="Valrhona 70% Guanaja">Valrhona 70% Guanaja Chocolate</option>
                  <option value="Pistachio Joconde (Contains Nuts)">Pistachio Joconde (Contains Nuts)</option>
                </select>
              </div>

              <div>
                <p className="font-bold text-[#594046] mb-1.5">Curd & Meringue Filling</p>
                <select
                  value={cakeFilling}
                  onChange={(e) => setCakeFilling(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E0BEC4] bg-[#FFF8F0]"
                >
                  <option value="Morello Cherry & Swiss Meringue">Morello Cherry & Swiss Meringue</option>
                  <option value="Passionfruit Curd & Ganache">Passionfruit Curd & White Ganache</option>
                  <option value="Salted Caramel & Hazelnut Praline">Salted Caramel & Hazelnut Praline</option>
                </select>
              </div>

              <input
                type="text"
                value={cakeClient}
                onChange={(e) => setCakeClient(e.target.value)}
                placeholder="Client or celebration name..."
                className="w-full px-3 py-2 rounded-lg border border-[#E0BEC4] bg-white"
              />
              <input
                type="text"
                value={cakeInscription}
                onChange={(e) => setCakeInscription(e.target.value)}
                placeholder="Chocolate plaque inscription (optional)"
                className="w-full px-3 py-2 rounded-lg border border-[#E0BEC4] bg-white"
              />

              <div className="flex items-center justify-between pt-2 border-t border-[#E0BEC4]">
                <span className="text-[#594046]">Estimated Valuation:</span>
                <span className="text-lg font-bold text-[#970046]">
                  ₹{calculatedCakePrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#970046] hover:bg-[#7A0038] text-white font-bold cursor-pointer"
              >
                + Book Custom Cake Commission
              </button>
            </form>
            <div className="mt-4 pt-3 border-t border-[#EADDD2] space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C7062]">
                Recent Commissions ({state.cakes.length})
              </div>
              {state.cakes.slice(0, 2).map((cake) => (
                <div
                  key={cake.id}
                  className="flex items-center justify-between gap-2 text-xs bg-[#FFFDFB] border border-[#EADDD2] rounded-xl px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[#2F1D14] truncate">{cake.clientName}</div>
                    <div className="text-[11px] text-[#7A5E4E] truncate">
                      {cake.tiers}-Tier · {cake.pickupDate}
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FBEAF2] text-[#970046]">
                    {cake.status}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: CUSTOM CAKES ROSTER */}
      {tab === "cakes" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <h1 className="font-serif text-xl font-bold">Booked Custom Cake Commissions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.cakes.map((cake) => (
              <div key={cake.id} className="rounded-2xl border border-[#E0BEC4] bg-white p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#970046]">{cake.refNo} • {cake.clientName}</span>
                  <span className="text-xs font-bold text-[#904D00]">₹{cake.price.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-xs font-semibold">
                  {cake.tiers}-Tier • {cake.sponge} + {cake.filling}
                </p>
                <p className="text-xs text-[#594046]">
                  Plaque: “{cake.inscription}” • Pickup: {cake.pickupDate}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {cake.allergens.map((a) => (
                    <span key={a} className="px-2 py-0.5 rounded bg-[#FFD9E0]/60 text-[#970046] text-[10px] font-bold">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E0BEC4]">
                  <span className="text-xs font-bold">{cake.status}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const nextMap: Record<CustomCakeOrder["status"], CustomCakeOrder["status"]> = {
                        "Tasting Approved": "Baking Sponge",
                        "Baking Sponge": "Crumb Coat",
                        "Crumb Coat": "Ready for Pickup",
                        "Ready for Pickup": "Ready for Pickup",
                      };
                      setState((prev) => ({
                        ...prev,
                        cakes: prev.cakes.map((c) =>
                          c.id === cake.id ? { ...c, status: nextMap[c.status] } : c
                        ),
                      }));
                      notify(`Updated ${cake.refNo} build status.`);
                    }}
                    className="px-3 py-1 rounded bg-[#970046] text-white text-xs font-semibold cursor-pointer"
                  >
                    Advance Cake Stage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: RECIPE SCALER & ALLERGENS */}
      {tab === "scaler" && selectedRecipe && (
        <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-xl font-bold">Baker’s Percentage & Batch Scaler</h1>
              <p className="text-xs text-[#594046]">Scale dry & wet weights dynamically while displaying mandatory allergen tags.</p>
            </div>
            <div className="flex gap-1.5">
              {([1, 2, 5] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setScaleMultiplier(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    scaleMultiplier === m ? "bg-[#970046] text-white" : "bg-white border border-[#E0BEC4]"
                  }`}
                >
                  {m}× Batch
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {state.recipes.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRecipeId(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedRecipe.id === r.id ? "bg-[#904D00] text-white" : "bg-white border border-[#E0BEC4]"
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-[#E0BEC4] bg-white p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-lg font-bold">{selectedRecipe.title}</h2>
              <div className="flex gap-1.5">
                {selectedRecipe.allergens.map((a) => (
                  <span key={a} className="px-2 py-0.5 rounded bg-[#FFD9E0] text-[#970046] text-[10px] font-bold">
                    ALLERGEN: {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="divide-y divide-[#F4EDE3] text-xs">
              {selectedRecipe.ingredients.map((ing) => (
                <div key={ing.name} className="py-2.5 flex justify-between font-medium">
                  <span>{ing.name}</span>
                  <span className="font-bold text-[#970046]">
                    {(ing.gramsPer1x * scaleMultiplier).toLocaleString("en-IN")} g
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: COUNTER & SHELF-LIFE SPOILAGE */}
      {tab === "counter" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <h1 className="font-serif text-xl font-bold">Boutique Counter Sales & Shelf-Life Monitor</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.counterItems.map((ci) => (
              <div key={ci.id} className="rounded-2xl border border-[#E0BEC4] bg-white p-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base">{ci.name}</h3>
                  <p className="text-xs text-[#594046]">
                    ₹{ci.price} • Shelf life {ci.shelfLifeHours}h • On Rack: <strong>{ci.onDisplay}</strong> • Sold: {ci.soldToday}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (ci.onDisplay <= 0) return;
                    setState((prev) => ({
                      ...prev,
                      counterItems: prev.counterItems.map((x) =>
                        x.id === ci.id ? { ...x, onDisplay: x.onDisplay - 1, soldToday: x.soldToday + 1 } : x
                      ),
                    }));
                    notify(`Sold 1× ${ci.name} at boutique counter.`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#970046] text-white text-xs font-bold cursor-pointer shrink-0"
                >
                  Ring Sale (-1)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-[#1E1B16] text-white text-xs font-medium shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#FFB1C3]" />
          {toast}
        </div>
      )}
    </div>
  );
}
