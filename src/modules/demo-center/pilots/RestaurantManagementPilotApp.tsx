"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChefHat,
  ClipboardList,
  FileText,
  Layers,
  LayoutDashboard,
  Menu,
  Monitor,
  Package,
  RotateCcw,
  Settings,
  Smartphone,
  Sparkles,
  Tablet,
  UserCheck,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../types";
import { toDemoModel } from "../registry";
import { useDemoState } from "../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import {
  RESTAURANT_PILOT_SEED,
  computePilotMetrics,
  type PilotScreenId,
  type RestaurantPilotState,
} from "./restaurantPilotData";
import {
  CategoriesManagementView,
  DashboardOverviewView,
  MenuManagementView,
  OrderDetailsView,
  OrdersManagementView,
  type PilotViewProps,
} from "./RestaurantPilotOperationsViews";
import {
  CustomerManagementView,
  InventoryView,
  ReservationsView,
  RestaurantSettingsView,
  SalesAnalyticsView,
  StaffManagementView,
  TableManagementView,
} from "./RestaurantPilotFloorAndAdminViews";

interface NavItemConfig {
  id: PilotScreenId;
  label: string;
  group: "Overview" | "Service" | "Culinary" | "Intelligence";
  icon: React.ComponentType<{ className?: string }>;
}

const PILOT_NAV_ITEMS: NavItemConfig[] = [
  { id: "dashboard-overview", label: "Dashboard Overview", group: "Overview", icon: LayoutDashboard },
  { id: "orders-management", label: "Orders Management", group: "Service", icon: ClipboardList },
  { id: "order-details", label: "Order Details (KOT)", group: "Service", icon: FileText },
  { id: "table-management", label: "Table Management", group: "Service", icon: UtensilsCrossed },
  { id: "reservations", label: "Reservations", group: "Service", icon: CalendarClock },
  { id: "menu-management", label: "Menu & Dishes", group: "Culinary", icon: BookOpen },
  { id: "categories-management", label: "Categories", group: "Culinary", icon: Layers },
  { id: "inventory", label: "Inventory", group: "Culinary", icon: Package },
  { id: "customer-management", label: "Customers", group: "Intelligence", icon: Users },
  { id: "staff-management", label: "Staff Brigade", group: "Intelligence", icon: UserCheck },
  { id: "sales-analytics", label: "Sales Analytics", group: "Intelligence", icon: BarChart3 },
  { id: "restaurant-settings", label: "Restaurant Settings", group: "Intelligence", icon: Settings },
];

export function RestaurantManagementPilotApp({ product }: { product: DemoProductDefinition }) {
  const initialSeed = useMemo<RestaurantPilotState>(() => {
    const raw = product.initialData as Partial<RestaurantPilotState> | undefined;
    if (raw && Array.isArray(raw.orders) && Array.isArray(raw.menuItems) && raw.settings) {
      return raw as RestaurantPilotState;
    }
    return RESTAURANT_PILOT_SEED;
  }, [product.initialData]);

  const { state, setState, resetState, hasReset } = useDemoState<RestaurantPilotState>(
    product.slug,
    initialSeed
  );

  const [activeScreen, setActiveScreen] = useState<PilotScreenId>("dashboard-overview");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialSeed.orders[0]?.id || "ord-1042"
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [deviceViewport, setDeviceViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const metrics = useMemo(() => computePilotMetrics(state), [state]);
  const demoModelCompat = useMemo(() => toDemoModel(product), [product]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleNavigate = (screen: PilotScreenId, contextOrderId?: string) => {
    if (contextOrderId) {
      setSelectedOrderId(contextOrderId);
    }
    setActiveScreen(screen);
    setMobileNavOpen(false);
  };

  const handleUpdateState: PilotViewProps["onUpdateState"] = (updater, toast) => {
    setState((prev) => updater(prev));
    if (toast) showToast(toast);
  };

  const handleLogActivity: PilotViewProps["onLogActivity"] = (summary, module) => {
    const now = new Date();
    const stamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setState((prev) => ({
      ...prev,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: stamp,
          actor: "Shift Manager",
          summary,
          module,
        },
        ...prev.activityLog.slice(0, 14),
      ],
    }));
  };

  const viewProps: PilotViewProps = {
    state,
    metrics,
    onNavigate: handleNavigate,
    onLogActivity: handleLogActivity,
    onUpdateState: handleUpdateState,
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "dashboard-overview":
        return <DashboardOverviewView {...viewProps} />;
      case "orders-management":
        return <OrdersManagementView {...viewProps} />;
      case "order-details":
        return (
          <OrderDetailsView
            {...viewProps}
            selectedOrderId={selectedOrderId}
            onSelectOrder={setSelectedOrderId}
          />
        );
      case "menu-management":
        return <MenuManagementView {...viewProps} />;
      case "categories-management":
        return <CategoriesManagementView {...viewProps} />;
      case "table-management":
        return <TableManagementView {...viewProps} />;
      case "reservations":
        return <ReservationsView {...viewProps} />;
      case "customer-management":
        return <CustomerManagementView {...viewProps} />;
      case "staff-management":
        return <StaffManagementView {...viewProps} />;
      case "inventory":
        return <InventoryView {...viewProps} />;
      case "sales-analytics":
        return <SalesAnalyticsView {...viewProps} />;
      case "restaurant-settings":
        return <RestaurantSettingsView {...viewProps} />;
      default:
        return <DashboardOverviewView {...viewProps} />;
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-5">
        <div className="px-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C2410C] text-white flex items-center justify-center shadow-sm">
              <ChefHat className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p
                className="text-base font-bold text-[#1C1917] leading-tight truncate"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {state.settings.restaurantName}
              </p>
              <p className="text-[11px] font-mono text-[#78716C] truncate">Hospitality OS</p>
            </div>
          </div>
        </div>

        <nav className="space-y-4" aria-label="Restaurant modules">
          {(["Overview", "Service", "Culinary", "Intelligence"] as const).map((group) => (
            <div key={group} className="space-y-1">
              <p className="px-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#78716C] font-semibold">
                {group}
              </p>
              {PILOT_NAV_ITEMS.filter((n) => n.group === group).map((item) => {
                const Icon = item.icon;
                const active = activeScreen === item.id;
                const badge =
                  item.id === "orders-management" && metrics.activeOrdersCount > 0
                    ? metrics.activeOrdersCount
                    : item.id === "inventory" && metrics.lowStockItems.length > 0
                    ? metrics.lowStockItems.length
                    : null;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-[#C2410C] text-white shadow-sm"
                        : "text-[#4D4540] hover:bg-[#F0EDE9] hover:text-[#1C1917]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {badge !== null && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          active ? "bg-white/20 text-white" : "bg-orange-100 text-[#C2410C]"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-6 p-3 rounded-xl bg-[#F0EDE9] border border-[#E7E2DA] text-[11px] text-[#4D4540] space-y-1">
        <p className="font-semibold text-[#1C1917]">Isolated Sandbox Active</p>
        <p>Edits persist per browser session without touching other demos.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col">
      {/* StarX Sandbox Top Control Bar */}
      <header className="sticky top-0 z-40 bg-[#1C1917] text-[#FAF7F2] border-b border-[#342E2A]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-5 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open module menu"
              className="lg:hidden p-1.5 rounded-lg bg-[#292524] hover:bg-[#3A3532] text-[#FAF7F2] cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <Link
              href="/demos"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#292524] hover:bg-[#3A3532] text-xs font-medium text-[#FAF7F2] transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catalogue</span>
            </Link>
            <div className="min-w-0 pl-1">
              <p className="text-xs sm:text-sm font-semibold truncate">{product.name}</p>
              <p className="text-[10px] font-mono text-[#D6D3D1] truncate hidden sm:block">
                Stitch Design System: Haute Hospitality OS • Slug: {product.slug}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden xl:flex items-center bg-[#292524] border border-[#3F3A36] rounded-lg p-0.5">
              {(
                [
                  { id: "desktop", icon: Monitor },
                  { id: "tablet", icon: Tablet },
                  { id: "mobile", icon: Smartphone },
                ] as const
              ).map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDeviceViewport(id)}
                  aria-label={`${id} preview width`}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                    deviceViewport === id ? "bg-[#C2410C] text-white" : "text-[#A8A29E] hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                resetState();
                showToast("Demo data restored to pristine Maison Ember seed");
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#292524] hover:bg-[#3A3532] border border-[#44403C] text-xs font-medium text-[#FAF7F2] cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${hasReset ? "animate-spin text-emerald-400" : ""}`} />
              <span className="hidden sm:inline">{hasReset ? "Restored" : "Reset Demo"}</span>
            </button>

            <button
              type="button"
              onClick={() => setCustomizationOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Build Similar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 py-4 sm:py-6 px-3 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            deviceViewport === "mobile"
              ? "max-w-[430px] border-x-4 border-[#1C1917] rounded-3xl bg-[#FAF7F2] shadow-2xl p-3"
              : deviceViewport === "tablet"
              ? "max-w-3xl border-x-4 border-[#1C1917] rounded-2xl bg-[#FAF7F2] shadow-2xl p-4"
              : "max-w-[1520px]"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Desktop Sidebar */}
            {deviceViewport === "desktop" && (
              <aside className="hidden lg:block w-64 shrink-0 sticky top-20 rounded-2xl bg-white border border-[#E7E2DA] p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
                {navContent}
              </aside>
            )}

            {/* Quick Mobile / Tablet Screen Switcher Strip */}
            <div className={deviceViewport === "desktop" ? "lg:hidden w-full overflow-x-auto pb-1" : "w-full overflow-x-auto pb-1"}>
              <div className="flex gap-1.5 min-w-max">
                {PILOT_NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap cursor-pointer ${
                      activeScreen === item.id
                        ? "bg-[#C2410C] text-white border-[#C2410C]"
                        : "bg-white text-[#4D4540] border-[#E7E2DA]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Module Canvas */}
            <main className="flex-1 min-w-0 w-full">{renderActiveScreen()}</main>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1917]/50 flex lg:hidden">
          <div className="w-72 max-w-[85vw] bg-white h-full p-4 overflow-y-auto shadow-2xl">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
                className="p-1.5 rounded-lg text-[#4D4540] hover:bg-[#F6F3EE] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {navContent}
          </div>
          <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#1C1917] text-[#FAF7F2] text-xs font-medium shadow-2xl flex items-center gap-2 border border-[#44403C]">
          <CheckCircle2 className="w-4 h-4 text-[#FB923C] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <CustomizationModal
        demo={demoModelCompat}
        isOpen={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
      />
    </div>
  );
}
