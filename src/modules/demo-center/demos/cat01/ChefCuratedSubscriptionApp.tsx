"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  Calendar,
  Utensils,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Flame,
  Activity,
  Plus,
  RefreshCw,
  Clock,
  Truck,
  Package,
  Layers,
  Settings,
  X,
  Check,
  AlertCircle,
  HelpCircle,
  Sliders,
  Award,
  Leaf,
  Beef,
  Fish,
  Wheat,
  TrendingUp,
  Info,
} from "lucide-react";

// =============================================================================
// DOMAIN MODELS & TYPES
// =============================================================================

export interface SubscriptionMeal {
  id: string;
  name: string;
  chef: string;
  category: "High Protein" | "Keto Clean" | "Plant-Forward" | "Mediterranean";
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  allergens: string[];
  description: string;
  image: string;
  badges: string[];
}

export interface WeeklyDeliveryWeek {
  id: string;
  weekLabel: string;
  deliveryDate: string;
  status: "Scheduled" | "Skipped" | "In Kitchen Prep" | "Delivered";
  selectedMealIds: string[];
}

interface SubscriptionState {
  subscriberName: string;
  subscriptionTier: "Signature 6-Meal" | "Performance 10-Meal" | "Athletic 14-Meal";
  mealsPerWeek: number;
  weeklyPrice: number;
  dietaryGoal: "Lean Muscle" | "Keto Metabolic" | "Plant Longevity" | "Balanced Gourmet";
  deliveryDay: "Sunday Evening (17:00 - 20:00)" | "Monday Morning (06:00 - 09:00)";
  activeTab: "menu-swaps" | "quiz" | "calendar" | "nutrition" | "kitchen-manifest";
  weeks: WeeklyDeliveryWeek[];
  activeWeekId: string;
  quizStep: number;
  quizAnswers: {
    goal: string;
    allergies: string[];
    portion: string;
    tier: string;
  };
}

// =============================================================================
// RICH SEED DATA
// =============================================================================

const ALL_MEALS: SubscriptionMeal[] = [
  {
    id: "meal-01",
    name: "Wild Alaskan Salmon & Saffron Quinoa",
    chef: "Chef Marcus Lin",
    category: "Mediterranean",
    calories: 520,
    protein: 44,
    carbs: 38,
    fats: 18,
    prepTime: "3 min heat",
    allergens: ["Fish"],
    description: "Sustainably caught wild sockeye salmon fillet over organic rainbow quinoa, Meyer lemon emulsion, and blistered baby zucchini.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    badges: ["Chef's Pick", "Omega-3 Rich"],
  },
  {
    id: "meal-02",
    name: "Prime Grass-Fed Flank Steak & Chimichurri",
    chef: "Chef Renata Ortiz",
    category: "High Protein",
    calories: 580,
    protein: 52,
    carbs: 22,
    fats: 24,
    prepTime: "3.5 min heat",
    allergens: [],
    description: "Char-grilled pastured beef flank with hand-crushed herbaceous chimichurri, roasted sweet potato wedges, and charred broccolini.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    badges: ["52g Protein", "Paleo Certified"],
  },
  {
    id: "meal-03",
    name: "Truffled Mushroom & White Bean Cassoulet",
    chef: "Chef Jean-Paul Vane",
    category: "Plant-Forward",
    calories: 440,
    protein: 26,
    carbs: 54,
    fats: 12,
    prepTime: "3 min heat",
    allergens: [],
    description: "Slow-simmered Tarbais white beans, black winter truffle essence, braised chanterelles, and crispy rosemary garlic crumb.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    badges: ["100% Vegan", "High Fiber"],
  },
  {
    id: "meal-04",
    name: "Herb-Roasted Organic Chicken & Polenta",
    chef: "Chef Marcus Lin",
    category: "Mediterranean",
    calories: 490,
    protein: 48,
    carbs: 32,
    fats: 16,
    prepTime: "3 min heat",
    allergens: ["Dairy"],
    description: "Pasture-raised airline chicken breast marinated in fresh tarragon and garlic, creamy golden polenta, and braised heirloom carrots.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80",
    badges: ["Clean Protein", "Gluten-Free"],
  },
  {
    id: "meal-05",
    name: "Slow-Braised Kurobuta Pork Belly Bowl",
    chef: "Chef Kaito Mori",
    category: "Keto Clean",
    calories: 610,
    protein: 38,
    carbs: 8,
    fats: 46,
    prepTime: "3.5 min heat",
    allergens: ["Soy"],
    description: "Heritage Kurobuta pork braised in tamari and star anise over cauli-rice, baby bok choy, and fermented house kimchi.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    badges: ["<8g Net Carbs", "Keto Verified"],
  },
  {
    id: "meal-06",
    name: "Miso-Glazed Black Cod & Ginger Broth",
    chef: "Chef Kaito Mori",
    category: "Mediterranean",
    calories: 460,
    protein: 40,
    carbs: 24,
    fats: 18,
    prepTime: "3 min heat",
    allergens: ["Fish", "Soy"],
    description: "Sustainably harvested sablefish caramelized with sweet white miso glaze, shiitake dashi broth, and tender baby tatsoi.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    badges: ["Anti-Inflammatory", "Low Sodium"],
  },
  {
    id: "meal-07",
    name: "Golden Turmeric Chickpea Tikka Masala",
    chef: "Chef Renata Ortiz",
    category: "Plant-Forward",
    calories: 430,
    protein: 24,
    carbs: 58,
    fats: 11,
    prepTime: "2.5 min heat",
    allergens: [],
    description: "Sprouted organic chickpeas simmered in rich coconut-ginger tikka sauce with black cumin basmati and cilantro chutney.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    badges: ["Plant Power", "Gut Friendly"],
  },
  {
    id: "meal-08",
    name: "Keto Grass-Fed Beef Bolognese Zoodles",
    chef: "Chef Jean-Paul Vane",
    category: "Keto Clean",
    calories: 540,
    protein: 46,
    carbs: 10,
    fats: 34,
    prepTime: "3 min heat",
    allergens: ["Dairy"],
    description: "Six-hour slow simmered Angus beef and pancetta ragù served over hand-spiralized green zucchini with 24-month aged parmesan.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    badges: ["Keto Comfort", "Zero Grain"],
  },
];

const INITIAL_WEEKS: WeeklyDeliveryWeek[] = [
  {
    id: "week-01",
    weekLabel: "Current Week (Nov 17 - Nov 23)",
    deliveryDate: "Sunday, Nov 17 · Evening Drop",
    status: "In Kitchen Prep",
    selectedMealIds: ["meal-01", "meal-02", "meal-04", "meal-05", "meal-06", "meal-08"],
  },
  {
    id: "week-02",
    weekLabel: "Upcoming Week (Nov 24 - Nov 30)",
    deliveryDate: "Sunday, Nov 24 · Evening Drop",
    status: "Scheduled",
    selectedMealIds: ["meal-01", "meal-02", "meal-03", "meal-04", "meal-06", "meal-07"],
  },
  {
    id: "week-03",
    weekLabel: "Future Week (Dec 01 - Dec 07)",
    deliveryDate: "Sunday, Dec 01 · Evening Drop",
    status: "Scheduled",
    selectedMealIds: ["meal-02", "meal-04", "meal-05", "meal-06", "meal-07", "meal-08"],
  },
  {
    id: "week-04",
    weekLabel: "Holiday Week (Dec 08 - Dec 14)",
    deliveryDate: "Sunday, Dec 08 · Evening Drop",
    status: "Skipped",
    selectedMealIds: ["meal-01", "meal-03", "meal-04", "meal-05", "meal-06", "meal-08"],
  },
];

// =============================================================================
// MAIN COMPONENT: CHEF-CURATED SUBSCRIPTION APP
// =============================================================================

export function ChefCuratedSubscriptionApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState } = useDemoState<SubscriptionState>(product.slug, {
    subscriberName: "Alexander Hayes",
    subscriptionTier: "Signature 6-Meal",
    mealsPerWeek: 6,
    weeklyPrice: 94,
    dietaryGoal: "Lean Muscle",
    deliveryDay: "Sunday Evening (17:00 - 20:00)",
    activeTab: "menu-swaps",
    weeks: INITIAL_WEEKS,
    activeWeekId: "week-01",
    quizStep: 1,
    quizAnswers: {
      goal: "Lean Muscle & High Protein",
      allergies: ["No Shellfish"],
      portion: "Standard Performance (450-600 kcal)",
      tier: "Signature 6-Meal ($94/wk)",
    },
  });

  // Category filter for swap menu
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const currentWeek = useMemo(() => {
    return state.weeks.find((w) => w.id === state.activeWeekId) || state.weeks[0];
  }, [state.weeks, state.activeWeekId]);

  const selectedMealsForWeek = useMemo(() => {
    return currentWeek.selectedMealIds
      .map((id) => ALL_MEALS.find((m) => m.id === id))
      .filter(Boolean) as SubscriptionMeal[];
  }, [currentWeek.selectedMealIds]);

  // Handle Meal Swapping
  const handleToggleMeal = (mealId: string) => {
    setState((s) => {
      const activeWk = s.weeks.find((w) => w.id === s.activeWeekId);
      if (!activeWk) return s;

      const isSelected = activeWk.selectedMealIds.includes(mealId);
      let nextIds: string[];

      if (isSelected) {
        if (activeWk.selectedMealIds.length <= 1) {
          alert("A subscription delivery requires at least 1 meal in your weekly box.");
          return s;
        }
        nextIds = activeWk.selectedMealIds.filter((id) => id !== mealId);
      } else {
        if (activeWk.selectedMealIds.length >= s.mealsPerWeek) {
          alert(
            `You have reached your ${s.mealsPerWeek}-meal capacity for this box. Remove a dish first or upgrade your plan.`
          );
          return s;
        }
        nextIds = [...activeWk.selectedMealIds, mealId];
      }

      return {
        ...s,
        weeks: s.weeks.map((w) => (w.id === s.activeWeekId ? { ...w, selectedMealIds: nextIds } : w)),
      };
    });
  };

  // Skip or Resume a week
  const handleToggleSkipWeek = (weekId: string) => {
    setState((s) => ({
      ...s,
      weeks: s.weeks.map((w) => {
        if (w.id === weekId) {
          const nextStatus = w.status === "Skipped" ? "Scheduled" : "Skipped";
          return { ...w, status: nextStatus };
        }
        return w;
      }),
    }));
  };

  // Macro calculations for the active box
  const totalMacros = useMemo(() => {
    return selectedMealsForWeek.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fats: acc.fats + m.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [selectedMealsForWeek]);

  const avgMacros = useMemo(() => {
    const count = selectedMealsForWeek.length || 1;
    return {
      calories: Math.round(totalMacros.calories / count),
      protein: Math.round(totalMacros.protein / count),
      carbs: Math.round(totalMacros.carbs / count),
      fats: Math.round(totalMacros.fats / count),
    };
  }, [totalMacros, selectedMealsForWeek.length]);

  return (
    <div className="min-h-screen bg-[#0A130F] text-[#E8EFEA] font-sans selection:bg-[#10B981]/30 selection:text-white antialiased">
      {/* =================================================================== */}
      {/* TOP NOTIFICATION / COMMERCE FLIGHT BAR */}
      {/* =================================================================== */}
      <div className="bg-[#0F1C16] border-b border-[#1C2E24] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-emerald-300/70">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[#10B981] hover:text-[#34D399] font-medium transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Catalogue Blueprint</span>
          </Link>
          <span className="text-[#263D31]">|</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            LIVE SUBSCRIPTION COMMERCE · CAT-01 #162
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#162B21] text-[10px] text-[#34D399] border border-[#10B981]/30 font-mono">
            {state.subscriptionTier} · {state.mealsPerWeek} Meals/Week
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setState((s) => ({
                ...s,
                activeTab: s.activeTab === "kitchen-manifest" ? "menu-swaps" : "kitchen-manifest",
              }))
            }
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 border ${
              state.activeTab === "kitchen-manifest"
                ? "bg-[#10B981] text-black font-semibold border-[#10B981]"
                : "bg-[#14261D] border-[#1C2E24] text-emerald-200 hover:text-white"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{state.activeTab === "kitchen-manifest" ? "Customer Portal" : "Kitchen Prep Cockpit"}</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SUBSCRIPTION COMMERCE HEADER */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A130F]/90 border-b border-[#1C2E24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#12281D] to-[#047857] border border-[#10B981]/40 flex items-center justify-center text-[#34D399] shadow-lg">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-serif tracking-wider text-white font-medium uppercase">
                  L'Artisan Gourmet Prep
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#14261D] text-[10px] font-mono text-[#34D399]">
                  Active Recurring
                </span>
              </div>
              <p className="text-xs font-mono text-emerald-200/60">
                Subscriber: {state.subscriberName} · Next Delivery: Nov 17
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs font-mono">
              <span className="text-emerald-400 font-bold">${state.weeklyPrice}.00 / week</span>
              <span className="text-[10px] text-emerald-300/60">{state.deliveryDay}</span>
            </div>
            <button
              onClick={() => setState((s) => ({ ...s, activeTab: "quiz" }))}
              className="px-3.5 py-1.5 rounded-xl bg-[#14261D] border border-[#10B981]/30 hover:border-[#10B981] text-xs font-mono text-[#34D399] transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Retake Diet Quiz</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#14261D] flex overflow-x-auto gap-1 text-xs font-mono scrollbar-none py-1.5">
          {[
            { id: "menu-swaps", label: "Weekly Menu & Swaps", icon: Utensils },
            { id: "quiz", label: "Dietary Intake Quiz", icon: Sparkles },
            { id: "calendar", label: "Schedule & Pause Weeks", icon: Calendar },
            { id: "nutrition", label: "Macro & Health Tracker", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = state.activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setState((s) => ({ ...s, activeTab: tab.id as any }))}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-[#14261D] text-[#34D399] font-semibold border border-[#10B981]/40"
                    : "text-emerald-200/60 hover:text-white hover:bg-[#0E1A14]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* =================================================================== */}
      {/* TAB 1: WEEKLY MENU & RECIPE SWAPPING */}
      {/* =================================================================== */}
      {state.activeTab === "menu-swaps" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Active Box Status & Macro Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#10241A] via-[#142B20] to-[#0D1C14] border border-[#10B981]/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[10px] font-mono text-[#34D399] border border-[#10B981]/30">
                    {currentWeek.status}
                  </span>
                  <span className="text-xs font-mono text-emerald-200/70">{currentWeek.weekLabel}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                  Your Curated Weekly Box ({selectedMealsForWeek.length} of {state.mealsPerWeek} Selected)
                </h2>
                <p className="text-xs text-emerald-100/70 max-w-xl">
                  Swap any recipe below before Friday 23:59 lock-out. Hand-prepped with organic ingredients and delivered
                  fresh in biodegradable thermal insulated chill-packs.
                </p>
              </div>

              {/* Box Macro Dashboard */}
              <div className="grid grid-cols-4 gap-3 bg-[#09140F]/80 p-4 rounded-xl border border-[#1C2E24] text-center font-mono">
                <div>
                  <span className="text-[10px] text-emerald-300/60 block uppercase">Avg Cal</span>
                  <span className="text-base font-bold text-white">{avgMacros.calories}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/60 block uppercase">Protein</span>
                  <span className="text-base font-bold text-[#34D399]">{avgMacros.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/60 block uppercase">Carbs</span>
                  <span className="text-base font-bold text-white">{avgMacros.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/60 block uppercase">Fats</span>
                  <span className="text-base font-bold text-white">{avgMacros.fats}g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1C2E24]">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["All", "High Protein", "Mediterranean", "Keto Clean", "Plant-Forward"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? "bg-[#10B981] text-black font-semibold border-[#10B981]"
                      : "bg-[#0E1B15] border-[#1C2E24] text-emerald-200/70 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-emerald-300/70">
              Box Capacity:{" "}
              <span className="text-white font-bold">
                {selectedMealsForWeek.length} / {state.mealsPerWeek}
              </span>
            </div>
          </div>

          {/* Meals Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_MEALS.filter((m) => selectedCategory === "All" || m.category === selectedCategory).map((meal) => {
              const isInBox = currentWeek.selectedMealIds.includes(meal.id);
              return (
                <div
                  key={meal.id}
                  className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group shadow-lg ${
                    isInBox
                      ? "bg-[#11241A] border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      : "bg-[#0B1611] border-[#1C2E24] hover:border-[#2E4A3B]"
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#34D399]">
                        {meal.category}
                      </div>
                      {isInBox && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#10B981] text-black font-mono font-bold text-[10px] flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>In Your Box</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-base font-serif text-white font-medium group-hover:text-[#34D399] transition-colors leading-snug">
                          {meal.name}
                        </h3>
                        <p className="text-xs font-mono text-emerald-300/60 mt-0.5">{meal.chef}</p>
                      </div>

                      <p className="text-xs text-emerald-100/70 line-clamp-2 leading-relaxed">
                        {meal.description}
                      </p>

                      <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-[#070E0B] border border-[#16271E] text-center font-mono text-[10px]">
                        <div>
                          <span className="text-emerald-400 block">{meal.calories}</span>
                          <span className="text-slate-500 text-[9px]">kcal</span>
                        </div>
                        <div>
                          <span className="text-[#34D399] font-bold block">{meal.protein}g</span>
                          <span className="text-slate-500 text-[9px]">protein</span>
                        </div>
                        <div>
                          <span className="text-white block">{meal.carbs}g</span>
                          <span className="text-slate-500 text-[9px]">carbs</span>
                        </div>
                        <div>
                          <span className="text-white block">{meal.fats}g</span>
                          <span className="text-slate-500 text-[9px]">fats</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleToggleMeal(meal.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-mono font-semibold transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                        isInBox
                          ? "bg-[#162B20] text-emerald-300 border border-[#10B981]/50 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/50"
                          : "bg-[#10B981] text-black hover:bg-[#34D399]"
                      }`}
                    >
                      {isInBox ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Weekly Box (Click to Remove)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Swap into Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 2: DIETARY INTAKE & PREFERENCE QUIZ */}
      {/* =================================================================== */}
      {state.activeTab === "quiz" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest">
              Algorithm & Chef Customization
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
              Dietary Intake & Macro Goal Quiz
            </h2>
            <p className="text-xs text-emerald-200/70">
              Step {state.quizStep} of 3 · Calibrate your weekly box to your personal fitness and biological objectives.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#162E22] border border-[#234F37] text-[10px] font-mono text-emerald-300">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Illustrative Dietary Preferences & Personalization (Non-Clinical Guidance)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D1C15] border border-[#1C2E24] p-6 sm:p-10 space-y-8 shadow-2xl">
            {state.quizStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-base font-serif text-white">Select Your Primary Nutritional Focus</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "Lean Muscle", desc: "45g+ protein per dish, complex carbs, optimal recovery." },
                    { id: "Keto Metabolic", desc: "<10g net carbs, healthy fats, avocado oils, sustained energy." },
                    { id: "Plant Longevity", desc: "100% whole food plant-based, organic legumes, zero dairy." },
                    { id: "Balanced Gourmet", desc: "Chef-driven variety, wild seafood, pastured meats, nutrient dense." },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          dietaryGoal: goal.id as any,
                          quizAnswers: { ...s.quizAnswers, goal: goal.id },
                        }))
                      }
                      className={`p-4 rounded-xl border text-left transition-all ${
                        state.dietaryGoal === goal.id
                          ? "bg-[#142B20] border-[#10B981] text-white shadow-lg"
                          : "bg-[#09130E] border-[#1C2E24] text-emerald-200/70 hover:text-white"
                      }`}
                    >
                      <span className="font-serif text-base font-medium text-white block">{goal.id}</span>
                      <span className="text-xs text-emerald-300/60 mt-1 block">{goal.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.quizStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-base font-serif text-white">Allergies & Dietary Exclusions</h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {["No Shellfish", "No Peanuts / Tree Nuts", "Gluten-Free Only", "Dairy-Free", "No Pork", "Low Sodium"].map(
                    (item) => {
                      const active = state.quizAnswers.allergies.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => {
                            setState((s) => {
                              const next = active
                                ? s.quizAnswers.allergies.filter((a) => a !== item)
                                : [...s.quizAnswers.allergies, item];
                              return { ...s, quizAnswers: { ...s.quizAnswers, allergies: next } };
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full border transition-all ${
                            active
                              ? "bg-[#10B981] text-black font-semibold border-[#10B981]"
                              : "bg-[#09130E] border-[#1C2E24] text-emerald-200/70 hover:text-white"
                          }`}
                        >
                          {active ? `✓ ${item}` : `+ ${item}`}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {state.quizStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-base font-serif text-white">Select Your Weekly Box Volume</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { tier: "Signature 6-Meal", count: 6, price: 94, perMeal: "$15.66" },
                    { tier: "Performance 10-Meal", count: 10, price: 148, perMeal: "$14.80" },
                    { tier: "Athletic 14-Meal", count: 14, price: 196, perMeal: "$14.00" },
                  ].map((plan) => (
                    <button
                      key={plan.tier}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          subscriptionTier: plan.tier as any,
                          mealsPerWeek: plan.count,
                          weeklyPrice: plan.price,
                          quizAnswers: { ...s.quizAnswers, tier: plan.tier },
                        }))
                      }
                      className={`p-4 rounded-xl border text-left transition-all ${
                        state.subscriptionTier === plan.tier
                          ? "bg-[#142B20] border-[#10B981] text-white shadow-lg"
                          : "bg-[#09130E] border-[#1C2E24] text-emerald-200/70 hover:text-white"
                      }`}
                    >
                      <span className="font-serif text-sm font-semibold text-white block">{plan.tier}</span>
                      <span className="text-xl font-mono font-bold text-[#34D399] mt-1 block">${plan.price}/wk</span>
                      <span className="text-[11px] font-mono text-emerald-300/60 block mt-0.5">{plan.perMeal} per dish · Free Insulated Shipping</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-[#1C2E24]">
              {state.quizStep > 1 ? (
                <button
                  onClick={() => setState((s) => ({ ...s, quizStep: s.quizStep - 1 }))}
                  className="px-4 py-2 rounded-lg border border-[#1C2E24] text-xs font-mono text-emerald-300 hover:text-white"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {state.quizStep < 3 ? (
                <button
                  onClick={() => setState((s) => ({ ...s, quizStep: s.quizStep + 1 }))}
                  className="px-6 py-2 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-black font-semibold text-xs font-mono uppercase tracking-wider"
                >
                  Continue to Step {state.quizStep + 1}
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert("Dietary Calibration Saved! Your weekly meal rotation is updated.");
                    setState((s) => ({ ...s, activeTab: "menu-swaps", quizStep: 1 }));
                  }}
                  className="px-6 py-2 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-black font-semibold text-xs font-mono uppercase tracking-wider shadow-lg"
                >
                  Apply to Active Subscription
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 3: SCHEDULE, SKIP & PAUSE CALENDAR */}
      {/* =================================================================== */}
      {state.activeTab === "calendar" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1C2E24]">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest">
              Zero Commitment Flexibility
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              Delivery Schedule & Skip Calendar
            </h2>
            <p className="text-xs text-emerald-200/70 mt-1">
              Traveling or eating out? Pause or skip any upcoming week with a single click. Zero cancellation penalties.
            </p>
          </div>

          <div className="space-y-4">
            {state.weeks.map((week) => (
              <div
                key={week.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  week.status === "Skipped"
                    ? "bg-[#09110D] border-[#1A2620] opacity-60"
                    : "bg-[#0D1C15] border-[#1C2E24] shadow-md"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                        week.status === "Skipped"
                          ? "bg-rose-950/40 text-rose-300 border-rose-500/30"
                          : week.status === "In Kitchen Prep"
                          ? "bg-amber-950/40 text-amber-300 border-amber-500/30"
                          : "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      {week.status}
                    </span>
                    <span className="text-xs font-mono text-emerald-300/60">{week.deliveryDate}</span>
                  </div>
                  <h3 className="text-lg font-serif text-white">{week.weekLabel}</h3>
                  <p className="text-xs text-emerald-200/60 font-mono">
                    {week.status === "Skipped"
                      ? "Delivery paused. You will not be billed for this week."
                      : `${week.selectedMealIds.length} Chef dishes selected · Billed at $${state.weeklyPrice}.00`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {week.status !== "In Kitchen Prep" && (
                    <button
                      onClick={() => handleToggleSkipWeek(week.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                        week.status === "Skipped"
                          ? "bg-[#10B981] text-black hover:bg-[#34D399]"
                          : "border border-[#263D31] bg-[#0E1B15] text-rose-300 hover:border-rose-400 hover:bg-rose-950/30"
                      }`}
                    >
                      {week.status === "Skipped" ? "Resume Delivery" : "Skip This Week"}
                    </button>
                  )}

                  {week.status !== "Skipped" && (
                    <button
                      onClick={() => setState((s) => ({ ...s, activeWeekId: week.id, activeTab: "menu-swaps" }))}
                      className="px-4 py-2 rounded-xl border border-[#1C2E24] bg-[#14261D] text-xs font-mono text-[#34D399] hover:border-[#10B981]"
                    >
                      Customize Meals
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 4: NUTRITION & MACRO TRACKER */}
      {/* =================================================================== */}
      {state.activeTab === "nutrition" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1C2E24]">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest">
              Biometric Performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              Macro & Nutrition Analytics
            </h2>
            <p className="text-xs text-emerald-200/70 mt-1">
              Transparent caloric and nutrient aggregation across your active weekly deliveries.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#162E22] border border-[#234F37] text-[10px] font-mono text-emerald-300 mt-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Illustrative Nutritional Calculator · Sample Dietary Reference Data (Non-Clinical Estimation)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0D1C15] border border-[#1C2E24] text-center">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Average Daily Calories</span>
              <p className="text-3xl font-mono font-bold text-white mt-1">{avgMacros.calories}</p>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Within Target Window</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1C15] border border-[#1C2E24] text-center">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Protein per Serving</span>
              <p className="text-3xl font-mono font-bold text-[#34D399] mt-1">{avgMacros.protein}g</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">High Recovery Ratio</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1C15] border border-[#1C2E24] text-center">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Complex Carbohydrates</span>
              <p className="text-3xl font-mono font-bold text-white mt-1">{avgMacros.carbs}g</p>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">Slow Glycemic Index</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1C15] border border-[#1C2E24] text-center">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Healthy Unsaturated Fats</span>
              <p className="text-3xl font-mono font-bold text-white mt-1">{avgMacros.fats}g</p>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Olive & Avocado Oils</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="rounded-2xl bg-[#0D1C15] border border-[#1C2E24] overflow-hidden">
            <div className="p-5 border-b border-[#1C2E24]">
              <h3 className="text-sm font-serif text-white font-medium">Selected Box Nutritional Audit</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120D] text-emerald-300/70 uppercase tracking-wider border-b border-[#1C2E24]">
                  <tr>
                    <th className="py-3 px-4">Dish Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Calories</th>
                    <th className="py-3 px-4">Protein</th>
                    <th className="py-3 px-4">Carbs</th>
                    <th className="py-3 px-4">Fats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#16271E] text-slate-200">
                  {selectedMealsForWeek.map((meal) => (
                    <tr key={meal.id} className="hover:bg-[#12241B] transition-colors">
                      <td className="py-3 px-4 font-serif text-white font-medium">{meal.name}</td>
                      <td className="py-3 px-4 text-[#34D399]">{meal.category}</td>
                      <td className="py-3 px-4">{meal.calories} kcal</td>
                      <td className="py-3 px-4 text-[#34D399] font-semibold">{meal.protein}g</td>
                      <td className="py-3 px-4">{meal.carbs}g</td>
                      <td className="py-3 px-4">{meal.fats}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 5: KITCHEN PREP & PACKING MANIFEST (OPERATIONS COCKPIT) */}
      {/* =================================================================== */}
      {state.activeTab === "kitchen-manifest" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1C2E24] flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest">
                  Culinary Operations Cockpit
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#162E22] text-emerald-300 border border-[#234F37]">
                  Demonstration Production Data
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white font-medium mt-1">
                Central Commissary Batch Manifest
              </h2>
            </div>
            <button
              onClick={() => setState((s) => ({ ...s, activeTab: "menu-swaps" }))}
              className="px-3.5 py-1.5 rounded-lg border border-[#1C2E24] bg-[#0D1C15] text-xs font-mono text-emerald-300 hover:text-white"
            >
              Return to Customer View
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0D1C15] border border-[#1C2E24]">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Active Subscribers</span>
              <p className="text-2xl font-serif text-white mt-1">1,248 Members</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">96.4% Retention (Sample)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D1C15] border border-[#1C2E24]">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">This Sunday Prep Batch</span>
              <p className="text-2xl font-serif text-[#34D399] mt-1">8,420 Meals</p>
              <span className="text-[10px] text-emerald-300/60 font-mono mt-1 block">Cooking Stations Allocated</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D1C15] border border-[#1C2E24]">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Cold Chain Dispatches</span>
              <p className="text-2xl font-serif text-white mt-1">1,114 Chill Boxes</p>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Refrigerated Fleet Ready</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D1C15] border border-[#1C2E24]">
              <span className="text-[10px] font-mono text-emerald-300/60 uppercase">Weekly Run Rate</span>
              <p className="text-2xl font-serif text-white mt-1">$124,600</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">Simulated Stripe Recurring Engine</span>
            </div>
          </div>

          {/* Packing Manifest for Subscriber */}
          <div className="rounded-2xl bg-[#0D1C15] border border-[#1C2E24] overflow-hidden">
            <div className="p-5 border-b border-[#1C2E24] flex justify-between items-center">
              <div>
                <h3 className="text-sm font-serif text-white font-medium">Box Packing Slip · Alexander Hayes</h3>
                <p className="text-xs text-emerald-200/60">Box ID: #BOX-NOV17-8820 · Destination: Central Delivery Hub</p>
              </div>
              <span className="px-3 py-1 rounded bg-[#10B981]/20 text-[#10B981] text-xs font-mono border border-[#10B981]/30">
                Verified Sealed
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedMealsForWeek.map((meal, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#08120D] border border-[#16271E] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px]">Slot {idx + 1}</span>
                      <p className="text-white font-medium text-sm font-serif">{meal.name}</p>
                      <p className="text-emerald-400 text-[11px]">{meal.category} · {meal.calories} kcal</p>
                    </div>
                    <span className="text-[#10B981] font-bold">✓ Packed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
