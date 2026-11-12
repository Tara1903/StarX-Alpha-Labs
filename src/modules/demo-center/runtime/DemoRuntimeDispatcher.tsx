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

const RestaurantManagementPilotApp = dynamic(
  () => import("../pilots/RestaurantManagementPilotApp").then((m) => m.RestaurantManagementPilotApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const RestaurantManagementOsApp = dynamic(
  () => import("../demos/cat01/RestaurantManagementOsApp").then((m) => m.RestaurantManagementOsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const RestaurantPosBillingApp = dynamic(
  () => import("../demos/cat01/RestaurantPosBillingApp").then((m) => m.RestaurantPosBillingApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const CloudKitchenHubApp = dynamic(
  () => import("../demos/cat01/CloudKitchenHubApp").then((m) => m.CloudKitchenHubApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const CafeEspressoOsApp = dynamic(
  () => import("../demos/cat01/CafeEspressoOsApp").then((m) => m.CafeEspressoOsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const LeLevainBakehouseApp = dynamic(
  () => import("../demos/cat01/LeLevainBakehouseApp").then((m) => m.LeLevainBakehouseApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const FoodDeliveryDispatchApp = dynamic(
  () => import("../demos/cat01/FoodDeliveryDispatchApp").then((m) => m.FoodDeliveryDispatchApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const VelvetHostReservationsApp = dynamic(
  () => import("../demos/cat01/VelvetHostReservationsApp").then((m) => m.VelvetHostReservationsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const AureliaGrandPmsApp = dynamic(
  () => import("../demos/cat01/AureliaGrandPmsApp").then((m) => m.AureliaGrandPmsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const BanquetFlowCateringApp = dynamic(
  () => import("../demos/cat01/BanquetFlowCateringApp").then((m) => m.BanquetFlowCateringApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const StreetRollFoodTruckApp = dynamic(
  () => import("../demos/cat01/StreetRollFoodTruckApp").then((m) => m.StreetRollFoodTruckApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const CopperStillBarPubApp = dynamic(
  () => import("../demos/cat01/CopperStillBarPubApp").then((m) => m.CopperStillBarPubApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const SnapServeQsrApp = dynamic(
  () => import("../demos/cat01/SnapServeQsrApp").then((m) => m.SnapServeQsrApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const HarvestCartGroceryApp = dynamic(
  () => import("../demos/cat01/HarvestCartGroceryApp").then((m) => m.HarvestCartGroceryApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const PantryLedgerWmsApp = dynamic(
  () => import("../demos/cat01/PantryLedgerWmsApp").then((m) => m.PantryLedgerWmsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const MeridianRetailStoreApp = dynamic(
  () => import("../demos/cat02/MeridianRetailStoreApp").then((m) => m.MeridianRetailStoreApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const PulseTillMultiStorePosApp = dynamic(
  () => import("../demos/cat02/PulseTillMultiStorePosApp").then((m) => m.PulseTillMultiStorePosApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const AtelierModeFashionApp = dynamic(
  () => import("../demos/cat02/AtelierModeFashionApp").then((m) => m.AtelierModeFashionApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const VoltrixElectronicsApp = dynamic(
  () => import("../demos/cat02/VoltrixElectronicsApp").then((m) => m.VoltrixElectronicsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const HarvestMartGroceryApp = dynamic(
  () => import("../demos/cat02/HarvestMartGroceryApp").then((m) => m.HarvestMartGroceryApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const NordicLivingFurnitureApp = dynamic(
  () => import("../demos/cat02/NordicLivingFurnitureApp").then((m) => m.NordicLivingFurnitureApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const AurumJewelleryApp = dynamic(
  () => import("../demos/cat02/AurumJewelleryApp").then((m) => m.AurumJewelleryApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const MedVancePharmacyApp = dynamic(
  () => import("../demos/cat02/MedVancePharmacyApp").then((m) => m.MedVancePharmacyApp),
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
const VanguardWholesaleApp = dynamic(
  () => import("../demos/cat02/VanguardWholesaleApp").then((m) => m.VanguardWholesaleApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const OmniVaultInventoryApp = dynamic(
  () => import("../demos/cat02/OmniVaultInventoryApp").then((m) => m.OmniVaultInventoryApp),
  { loading: () => <ForgeRuntimeLoading /> }
);
const ResolvrReturnsApp = dynamic(
  () => import("../demos/cat02/ResolvrReturnsApp").then((m) => m.ResolvrReturnsApp),
  { loading: () => <ForgeRuntimeLoading /> }
);

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

  if (product.slug === "restaurant-management-system") {
    return <RestaurantManagementOsApp product={product} />;
  }

  if (product.slug === "restaurant-pos-billing") {
    return <RestaurantPosBillingApp product={product} />;
  }

  if (product.slug === "cloud-kitchen-management") {
    return <CloudKitchenHubApp product={product} />;
  }

  if (product.slug === "cafe-management-system") {
    return <CafeEspressoOsApp product={product} />;
  }

  if (product.slug === "bakery-management-system") {
    return <LeLevainBakehouseApp product={product} />;
  }

  if (product.slug === "food-delivery-management") {
    return <FoodDeliveryDispatchApp product={product} />;
  }

  if (product.slug === "table-reservation-booking") {
    return <VelvetHostReservationsApp product={product} />;
  }

  if (product.slug === "hotel-restaurant-management") {
    return <AureliaGrandPmsApp product={product} />;
  }

  if (product.slug === "catering-business-management") {
    return <BanquetFlowCateringApp product={product} />;
  }

  if (product.slug === "food-truck-management") {
    return <StreetRollFoodTruckApp product={product} />;
  }

  if (product.slug === "bar-pub-management") {
    return <CopperStillBarPubApp product={product} />;
  }

  if (product.slug === "qsr-management") {
    return <SnapServeQsrApp product={product} />;
  }

  if (product.slug === "grocery-fresh-food-ordering") {
    return <HarvestCartGroceryApp product={product} />;
  }

  if (product.slug === "food-inventory-supply-management") {
    return <PantryLedgerWmsApp product={product} />;
  }

  if (product.slug === "retail-store-management") {
    return <MeridianRetailStoreApp product={product} />;
  }

  if (product.slug === "multi-store-pos-system") {
    return <PulseTillMultiStorePosApp product={product} />;
  }

  if (product.slug === "fashion-apparel-store") {
    return <AtelierModeFashionApp product={product} />;
  }

  if (product.slug === "electronics-store-management") {
    return <VoltrixElectronicsApp product={product} />;
  }

  if (product.slug === "grocery-store-management") {
    return <HarvestMartGroceryApp product={product} />;
  }

  if (product.slug === "furniture-store-management") {
    return <NordicLivingFurnitureApp product={product} />;
  }

  if (product.slug === "jewellery-store-management") {
    return <AurumJewelleryApp product={product} />;
  }

  if (product.slug === "pharmacy-retail-management") {
    return <MedVancePharmacyApp product={product} />;
  }

  if (product.slug === "ecommerce-storefront") {
    return <AuraDirectEcommerceApp product={product} />;
  }

  if (product.slug === "multi-vendor-marketplace") {
    return <NexusMarketplaceApp product={product} />;
  }

  if (product.slug === "online-fashion-boutique") {
    return <MaisonEpureBoutiqueApp product={product} />;
  }

  if (product.slug === "wholesale-distribution-management") {
    return <VanguardWholesaleApp product={product} />;
  }

  if (product.slug === "inventory-stock-management") {
    return <OmniVaultInventoryApp product={product} />;
  }

  if (product.slug === "order-returns-management") {
    return <ResolvrReturnsApp product={product} />;
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
