"use client";

import React, { useState, useMemo } from "react";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Thermometer,
  RotateCcw,
  Plus,
  Search,
  CheckCircle2,
  FileText,
  Truck,
  Archive,
  Barcode,
  Layers,
  ChevronRight,
  Filter,
  User,
  Activity,
  Lock,
  Building,
} from "lucide-react";

interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  category: "Antibiotics" | "Cold Chain / Biologics" | "Pain & Analgesics" | "Cardiac / Chronic Care" | "General OTC";
  formulation: string;
  ndc: string;
  lotNo: string;
  mfgDate: string;
  expiryDate: string;
  daysToExpiry: number;
  shelfLocation: string;
  stockUnits: number;
  unitPriceUsd: number;
  isColdChain?: boolean;
  tempCelsius?: number;
  isScheduleControlled?: boolean;
  scheduleLevel?: string;
  status: "In Stock" | "Low Stock" | "Critical Expiry" | "Quarantined";
}

interface PrescriptionItem {
  rxNumber: string;
  patientName: string;
  patientMrn: string;
  patientDob: string;
  allergies: string[];
  insuranceProvider: string;
  insuranceCopayUsd: number;
  prescriberName: string;
  prescriberNpi: string;
  clinic: string;
  medicationName: string;
  dosageSig: string;
  daysSupply: number;
  qtyToDispense: number;
  status: "Awaiting Verification" | "Ready for Dispensing" | "Dispensed";
}

interface PurchaseOrder {
  poNumber: string;
  supplier: string;
  itemsSummary: string;
  unitsOrdered: number;
  totalCostUsd: number;
  expectedDate: string;
  status: "Confirmed" | "In Transit" | "Received";
}

interface DispensedRecord {
  dispenseId: string;
  timestamp: string;
  rxNumber: string;
  patientName: string;
  medicationName: string;
  lotNo: string;
  qty: number;
  pharmacist: string;
  totalUsd: number;
}

interface MedVancePharmacyState {
  fridgeTempCelsius: number;
  pharmacistOnDuty: string;
  licenseNo: string;
  activePatientRx: PrescriptionItem;
  medications: MedicationItem[];
  pendingPrescriptions: PrescriptionItem[];
  purchaseOrders: PurchaseOrder[];
  dispensedLedger: DispensedRecord[];
  quarantineLots: Array<{
    lotNo: string;
    medication: string;
    units: number;
    reason: string;
    date: string;
  }>;
}

const PHARMACY_SEED: MedVancePharmacyState = {
  fridgeTempCelsius: 3.8,
  pharmacistOnDuty: "Dr. Marcus Reed, PharmD (Bay #4)",
  licenseNo: "#PH-CH-9941",
  activePatientRx: {
    rxNumber: "RX-8849-01",
    patientName: "Eleanor Vance",
    patientMrn: "EV-992014",
    patientDob: "14-Apr-1984 (Age 40)",
    allergies: ["Penicillin (Severe - Anaphylaxis)", "Sulfa Drugs"],
    insuranceProvider: "BlueCross Core Health (ID: BC-881920-A)",
    insuranceCopayUsd: 15.0,
    prescriberName: "Dr. Aris Thorne, MD",
    prescriberNpi: "1982736450 (DEA #BT-449102)",
    clinic: "St. Jude Metropolitan Medical Center",
    medicationName: "Humira (Adalimumab) 40mg/0.8mL Pen",
    dosageSig: "Inject 40mg subcutaneously every other week as directed. Rotate injection sites.",
    daysSupply: 28,
    qtyToDispense: 2,
    status: "Ready for Dispensing",
  },
  medications: [
    {
      id: "med-1",
      name: "Humira (Adalimumab)",
      genericName: "Adalimumab Subcutaneous Solution",
      category: "Cold Chain / Biologics",
      formulation: "40mg/0.8mL Pre-filled Pen",
      ndc: "0074-4339-02",
      lotNo: "LOT-BIO-9920-X",
      mfgDate: "Oct 2024",
      expiryDate: "18-May-2026",
      daysToExpiry: 18,
      shelfLocation: "Unit-C2 Fridge (Rack 01)",
      stockUnits: 14,
      unitPriceUsd: 1450.0,
      isColdChain: true,
      tempCelsius: 3.8,
      status: "Critical Expiry",
    },
    {
      id: "med-2",
      name: "Amoxicillin Clavulanate (Augmentin)",
      genericName: "Amoxicillin + Clavulanic Acid",
      category: "Antibiotics",
      formulation: "875mg / 125mg Film-Coated Tablet",
      ndc: "0029-6085-39",
      lotNo: "LOT-AMX-2024-8841",
      mfgDate: "Jan 2025",
      expiryDate: "15-Dec-2027",
      daysToExpiry: 580,
      shelfLocation: "Dispensary Rack B-04",
      stockUnits: 420,
      unitPriceUsd: 28.5,
      status: "In Stock",
    },
    {
      id: "med-3",
      name: "Atorvastatin Calcium (Lipitor)",
      genericName: "Atorvastatin Trihydrate",
      category: "Cardiac / Chronic Care",
      formulation: "20mg Oval Film-Coated Tablet",
      ndc: "0071-0155-23",
      lotNo: "LOT-LIP-2023-112",
      mfgDate: "Mar 2024",
      expiryDate: "30-Aug-2028",
      daysToExpiry: 820,
      shelfLocation: "Storage Bay A-12",
      stockUnits: 1850,
      unitPriceUsd: 14.2,
      status: "In Stock",
    },
    {
      id: "med-4",
      name: "Oxycodone / APAP (Percocet)",
      genericName: "Oxycodone Hydrochloride 10mg / Acetaminophen 325mg",
      category: "Pain & Analgesics",
      formulation: "10mg / 325mg Scored Capsule Tablet",
      ndc: "0406-8515-01",
      lotNo: "LOT-SCH2-4410-09",
      mfgDate: "Nov 2024",
      expiryDate: "24-May-2026",
      daysToExpiry: 24,
      shelfLocation: "Safe Vault Door #1 (Double Lock)",
      stockUnits: 88,
      unitPriceUsd: 45.0,
      isScheduleControlled: true,
      scheduleLevel: "Schedule II (Strict Quota)",
      status: "Low Stock",
    },
    {
      id: "med-5",
      name: "Ceftriaxone Sodium",
      genericName: "Ceftriaxone for Injection USP",
      category: "Antibiotics",
      formulation: "1g Sterile Lyophilized Powder Vial",
      ndc: "0004-1963-01",
      lotNo: "LOT-CFT-7721-B",
      mfgDate: "Feb 2025",
      expiryDate: "10-Jan-2028",
      daysToExpiry: 610,
      shelfLocation: "Sterile Reconstitution Stn 2",
      stockUnits: 95,
      unitPriceUsd: 38.0,
      status: "In Stock",
    },
    {
      id: "med-6",
      name: "Metoprolol Succinate ER",
      genericName: "Metoprolol Succinate Extended-Release",
      category: "Cardiac / Chronic Care",
      formulation: "50mg Extended-Release Tablet",
      ndc: "0186-1088-05",
      lotNo: "LOT-MTP-3301-K",
      mfgDate: "May 2024",
      expiryDate: "12-May-2026",
      daysToExpiry: 12,
      shelfLocation: "Dispensary Bay C-07",
      stockUnits: 310,
      unitPriceUsd: 18.0,
      status: "Critical Expiry",
    },
  ],
  pendingPrescriptions: [
    {
      rxNumber: "RX-8849-01",
      patientName: "Eleanor Vance",
      patientMrn: "EV-992014",
      patientDob: "14-Apr-1984 (Age 40)",
      allergies: ["Penicillin", "Sulfa Drugs"],
      insuranceProvider: "BlueCross Core Health",
      insuranceCopayUsd: 15.0,
      prescriberName: "Dr. Aris Thorne, MD",
      prescriberNpi: "1982736450",
      clinic: "St. Jude Metropolitan Medical Center",
      medicationName: "Humira (Adalimumab) 40mg/0.8mL Pen",
      dosageSig: "Inject 40mg subcutaneously every 14 days",
      daysSupply: 28,
      qtyToDispense: 2,
      status: "Ready for Dispensing",
    },
    {
      rxNumber: "RX-9902-18",
      patientName: "David K. Campbell",
      patientMrn: "DC-774019",
      patientDob: "22-Oct-1962 (Age 64)",
      allergies: ["Aspirin"],
      insuranceProvider: "Medicare Part D",
      insuranceCopayUsd: 5.0,
      prescriberName: "Dr. Sarah Lin, MD",
      prescriberNpi: "1497820199",
      clinic: "Cardiology Associates of Lakeview",
      medicationName: "Atorvastatin Calcium 20mg",
      dosageSig: "Take 1 tablet daily at bedtime",
      daysSupply: 90,
      qtyToDispense: 90,
      status: "Awaiting Verification",
    },
  ],
  purchaseOrders: [
    {
      poNumber: "PO-MED-99410",
      supplier: "AmerisourceBergen Healthcare Direct",
      itemsSummary: "Humira 40mg Pen (x20), Lantus Solostar (x30)",
      unitsOrdered: 50,
      totalCostUsd: 18450.0,
      expectedDate: "Tomorrow, 08:30 AM",
      status: "In Transit",
    },
    {
      poNumber: "PO-MED-99408",
      supplier: "McKesson Pharmaceuticals National",
      itemsSummary: "Augmentin 875mg (x500), Metoprolol ER 50mg (x400)",
      unitsOrdered: 900,
      totalCostUsd: 4320.0,
      expectedDate: "Nov 12, 2026",
      status: "Received",
    },
  ],
  dispensedLedger: [
    {
      dispenseId: "DISP-8841-A",
      timestamp: "Today, 10:14 AM",
      rxNumber: "RX-7721-04",
      patientName: "Robert Hayes",
      medicationName: "Amoxicillin Clavulanate 875/125mg",
      lotNo: "LOT-AMX-2024-8841",
      qty: 20,
      pharmacist: "Dr. Marcus Reed, PharmD",
      totalUsd: 28.5,
    },
    {
      dispenseId: "DISP-8840-X",
      timestamp: "Today, 09:42 AM",
      rxNumber: "RX-6601-92",
      patientName: "Claire Beauchamp",
      medicationName: "Ceftriaxone Sodium 1g Vial",
      lotNo: "LOT-CFT-7721-B",
      qty: 2,
      pharmacist: "Dr. Marcus Reed, PharmD",
      totalUsd: 76.0,
    },
  ],
  quarantineLots: [
    {
      lotNo: "LOT-DM-9910-E",
      medication: "Dextroamphetamine 10mg IR",
      units: 40,
      reason: "Supplier Voluntary Recall — Packaging Seal Integrity Check",
      date: "Nov 08, 2026",
    },
  ],
};

export function MedVancePharmacyApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<MedVancePharmacyState>(product.slug, PHARMACY_SEED);

  const [activeTab, setActiveTab] = useState<
    "dispensary" | "traceability" | "prescriptions" | "orders" | "quarantine" | "ledger"
  >("dispensary");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Rx & OTC");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddLotModalOpen, setIsAddLotModalOpen] = useState(false);
  const [dispenseSuccessModal, setDispenseSuccessModal] = useState(false);
  const [lastDispensedSummary, setLastDispensedSummary] = useState("");

  // New Lot Form
  const [newLotForm, setNewLotForm] = useState({
    name: "",
    genericName: "",
    category: "Antibiotics" as const,
    formulation: "",
    ndc: "0029-4410-12",
    lotNo: "",
    shelfLocation: "Rack A-01",
    stockUnits: "100",
    unitPrice: "19.99",
    expiryDate: "2027-12-31",
  });

  const filteredMeds = useMemo(() => {
    return state.medications.filter((m) => {
      const matchCat = selectedCategory === "All Rx & OTC" || m.category === selectedCategory;
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.ndc.includes(searchQuery) ||
        m.lotNo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [state.medications, selectedCategory, searchQuery]);

  const criticalExpiryCount = useMemo(() => {
    return state.medications.filter((m) => m.daysToExpiry <= 30).length;
  }, [state.medications]);

  const handleSelectMedForDispense = (med: MedicationItem) => {
    setState((prev) => ({
      ...prev,
      activePatientRx: {
        ...prev.activePatientRx,
        medicationName: `${med.name} (${med.formulation})`,
        qtyToDispense: 1,
        status: "Ready for Dispensing",
      },
    }));
  };

  const handleDispenseRx = () => {
    const rx = state.activePatientRx;
    if (rx.status === "Dispensed") return;

    const matchedMed = state.medications.find(
      (m) => rx.medicationName.toLowerCase().includes(m.name.toLowerCase()) || m.id === "med-1"
    );

    const lotUsed = matchedMed ? matchedMed.lotNo : "LOT-AMX-2024-8841";
    const qtyUsed = rx.qtyToDispense || 1;

    const newRecord: DispensedRecord = {
      dispenseId: `DISP-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-3)}`,
      timestamp: "Just now",
      rxNumber: rx.rxNumber,
      patientName: rx.patientName,
      medicationName: rx.medicationName,
      lotNo: lotUsed,
      qty: qtyUsed,
      pharmacist: state.pharmacistOnDuty,
      totalUsd: rx.insuranceCopayUsd,
    };

    setState((prev) => ({
      ...prev,
      medications: prev.medications.map((m) => {
        if (m.lotNo === lotUsed) {
          return { ...m, stockUnits: Math.max(0, m.stockUnits - qtyUsed) };
        }
        return m;
      }),
      dispensedLedger: [newRecord, ...prev.dispensedLedger],
      activePatientRx: {
        ...prev.activePatientRx,
        status: "Dispensed",
      },
    }));

    setLastDispensedSummary(`${rx.medicationName} (Qty: ${qtyUsed}) for ${rx.patientName} — Rx #${rx.rxNumber}`);
    setDispenseSuccessModal(true);
  };

  const handleAddNewLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLotForm.name || !newLotForm.lotNo) return;
    const ndcValue = newLotForm.ndc || "0029-4410-12";

    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: newLotForm.name,
      genericName: newLotForm.genericName || newLotForm.name,
      category: newLotForm.category,
      formulation: newLotForm.formulation || "500mg Oral Tablet",
      ndc: ndcValue,
      lotNo: newLotForm.lotNo.toUpperCase(),
      mfgDate: "Today",
      expiryDate: newLotForm.expiryDate,
      daysToExpiry: 365,
      shelfLocation: newLotForm.shelfLocation,
      stockUnits: parseInt(newLotForm.stockUnits, 10) || 50,
      unitPriceUsd: parseFloat(newLotForm.unitPrice) || 25.0,
      status: "In Stock",
    };

    setState((prev) => ({
      ...prev,
      medications: [newMed, ...prev.medications],
    }));

    setIsAddLotModalOpen(false);
    setNewLotForm({
      name: "",
      genericName: "",
      category: "Antibiotics",
      formulation: "",
      ndc: "",
      lotNo: "",
      shelfLocation: "Rack A-01",
      stockUnits: "100",
      unitPrice: "19.99",
      expiryDate: "2027-12-31",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F9FF] text-[#161C22] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Clinical Header Bar */}
      <header className="bg-white border-b border-[#DDE3EB] px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00685F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-[#00685F]">
                  MedVance OS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  CLINICAL TIER-1
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">Dispensary License {state.licenseNo} • Accredited</p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Pharmacist shift indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">{state.pharmacistOnDuty}</span>
          </div>

          {/* Cold Chain Vaccine Refrigerator Telemetry */}
          <div className="flex items-center gap-2 text-xs font-mono bg-teal-50 text-teal-900 border border-teal-200 px-3 py-1 rounded-md">
            <Thermometer className="w-3.5 h-3.5 text-teal-700 animate-pulse" />
            <span>Unit-C2 Biologics Fridge:</span>
            <strong className="text-teal-950 font-bold">{state.fridgeTempCelsius}°C Normal</strong>
            <span className="text-[10px] text-teal-700 hidden lg:inline">(Target: 2.0°C – 8.0°C)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => resetState()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setIsAddLotModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00685F] text-white hover:bg-[#00524B] text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log New Batch Lot</span>
          </button>
        </div>
      </header>

      {/* Sub-header Navigation Tabs */}
      <nav className="bg-[#EEF4FC] border-b border-[#DDE3EB] px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab("dispensary")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "dispensary"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Medication Dispensary & NDC</span>
          </button>

          <button
            onClick={() => setActiveTab("traceability")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "traceability"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Batch Traceability & Expiry</span>
            {criticalExpiryCount > 0 && (
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                {criticalExpiryCount} Alert
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("prescriptions")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "prescriptions"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Rx Verification Queue</span>
            <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded-full font-bold">
              {state.pendingPrescriptions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "orders"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Wholesale POs & Supplies</span>
          </button>

          <button
            onClick={() => setActiveTab("quarantine")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "quarantine"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Quarantine & Waste</span>
          </button>

          <button
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "ledger"
                ? "bg-[#00685F] text-white font-bold shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Dispensing Ledger</span>
            <span className="text-[10px] bg-slate-300 text-slate-800 px-1.5 py-0.2 rounded-full font-bold font-mono">
              {state.dispensedLedger.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="hidden sm:inline">NCPDP Telecomm D.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>DEA Verified</span>
        </div>
      </nav>

      {/* Main Clinical Operations Workspace */}
      <main className="flex-1 p-3 sm:p-5 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: DISPENSARY & RAPID CHECKOUT */}
        {activeTab === "dispensary" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0">
            {/* LEFT 65%: Medication Dispensary Catalogue */}
            <div className="lg:col-span-8 space-y-4 min-w-0">
              {/* Filter & Search Bar */}
              <div className="bg-white rounded-xl border border-[#DDE3EB] p-3 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Scan Barcode, search by Drug Name, NDC, or Lot #..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00685F]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
                    <Barcode className="w-4 h-4 text-slate-500" />
                    <span>Barcode Gun Synced</span>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {[
                    "All Rx & OTC",
                    "Antibiotics",
                    "Cold Chain / Biologics",
                    "Pain & Analgesics",
                    "Cardiac / Chronic Care",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#00685F] text-white font-bold"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medication Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0">
                {filteredMeds.map((med) => {
                  const isExpiringSoon = med.daysToExpiry <= 30;
                  return (
                    <div
                      key={med.id}
                      className={`bg-white rounded-xl border p-4 shadow-xs space-y-3 transition-all hover:shadow-md ${
                        isExpiringSoon
                          ? "border-rose-300 bg-rose-50/20"
                          : med.isScheduleControlled
                          ? "border-amber-300 bg-amber-50/20"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-slate-900 leading-tight">{med.name}</h3>
                            {med.isColdChain && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-mono font-bold flex items-center gap-1">
                                <Thermometer className="w-3 h-3 text-teal-600" />
                                {med.tempCelsius}°C
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 italic mt-0.5">{med.formulation}</p>
                        </div>

                        {/* Expiry Badge */}
                        <div className="text-right">
                          {isExpiringSoon ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              {med.daysToExpiry}d Expiry!
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Good Expiry
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Matrix */}
                      <div className="bg-slate-50 rounded-lg p-2.5 text-xs font-mono space-y-1.5 border border-slate-100 text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-400">NDC:</span>
                          <strong className="text-slate-800">{med.ndc}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Lot Batch:</span>
                          <span className="text-[#00685F] font-bold">{med.lotNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Shelf Exp:</span>
                          <span className={isExpiringSoon ? "text-rose-700 font-bold" : "text-slate-700"}>
                            {med.expiryDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Location:</span>
                          <span className="text-slate-600">{med.shelfLocation}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-200">
                          <span className="text-slate-500 font-sans font-medium">In-Stock:</span>
                          <strong className="text-sm font-bold text-slate-900">{med.stockUnits} units</strong>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-slate-700">${med.unitPriceUsd.toFixed(2)}/unit</span>
                        <button
                          onClick={() => handleSelectMedForDispense(med)}
                          className="px-3 py-1.5 rounded-lg bg-[#00685F] hover:bg-[#00524B] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Pill className="w-3.5 h-3.5" />
                          <span>Select for Dispensing</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 35%: Rapid Rx Dispensing Terminal */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#DDE3EB] p-4 sm:p-5 shadow-sm space-y-4 min-w-0">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="font-bold text-sm sm:text-base text-slate-900">Rapid Rx Dispensing Terminal</h2>
                </div>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  {state.activePatientRx.status === "Dispensed" ? "COMPLETED" : "READY TO SIGN"}
                </span>
              </div>

              {/* Patient Chart Card */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Patient Chart
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{state.activePatientRx.patientName}</h3>
                    <p className="text-xs text-slate-600 font-mono">{state.activePatientRx.patientDob}</p>
                  </div>
                  <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    MRN: {state.activePatientRx.patientMrn}
                  </span>
                </div>

                {/* Allergy Warnings */}
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-xs text-rose-900 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Allergy Alert Enforced</span>
                  </div>
                  <p className="text-[11px] text-rose-700">
                    {state.activePatientRx.allergies.join(" • ")}
                  </p>
                </div>

                {/* Insurance Co-Pay */}
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
                  <span className="text-slate-500">{state.activePatientRx.insuranceProvider}</span>
                  <span className="font-bold text-emerald-800 font-mono">
                    Co-Pay: ${state.activePatientRx.insuranceCopayUsd.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Prescriber Validation */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Authorized Prescriber
                </span>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-800">{state.activePatientRx.prescriberName}</strong>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    DEA & NPI Valid
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{state.activePatientRx.clinic}</p>
              </div>

              {/* Medication to Dispense */}
              <div className="bg-teal-50/40 rounded-xl p-3.5 border border-teal-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                    Prescribed Dispense
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-900">
                    Rx #{state.activePatientRx.rxNumber}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{state.activePatientRx.medicationName}</h4>
                <div className="text-xs text-slate-600 italic bg-white/80 p-2 rounded border border-teal-100">
                  "{state.activePatientRx.dosageSig}"
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-700 pt-1">
                  <span>Days Supply: {state.activePatientRx.daysSupply} days</span>
                  <span className="font-bold">Quantity: {state.activePatientRx.qtyToDispense} units</span>
                </div>
              </div>

              {/* Schedule Protocol Compliance Gate */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-100 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Schedule H / Cold Chain Verification Checked by RPh</span>
              </div>

              {/* CTA Action */}
              <button
                onClick={handleDispenseRx}
                disabled={state.activePatientRx.status === "Dispensed"}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  state.activePatientRx.status === "Dispensed"
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-[#00685F] hover:bg-[#00524B] text-white"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {state.activePatientRx.status === "Dispensed"
                    ? "Prescription Dispensed & Label Printed"
                    : "Authorize Dispense & Print Rx Label"}
                </span>
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-tight">
                Simulated Clinical Dispensary Demo — All Patient & Rx Records Fictional. Does not provide real medical advice.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: BATCH TRACEABILITY & EXPIRY AUDIT */}
        {activeTab === "traceability" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#DDE3EB] p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-base text-slate-900">National Batch Lot Traceability Register</h2>
                <p className="text-xs text-slate-500">
                  Audit trail linking lot manufacture dates, shelf lifespans, storage zones, and active unit balances.
                </p>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full font-bold">
                {state.medications.length} Active Monitored Lots
              </span>
            </div>

            <div className="bg-white rounded-xl border border-[#DDE3EB] shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 font-mono">
                    <th className="p-3">Lot #</th>
                    <th className="p-3">Medication Name</th>
                    <th className="p-3">NDC Code</th>
                    <th className="p-3">Mfg Date</th>
                    <th className="p-3">Expiry Date</th>
                    <th className="p-3">Days Left</th>
                    <th className="p-3">Location</th>
                    <th className="p-3 text-right">Units</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.medications.map((m) => {
                    const isUrgent = m.daysToExpiry <= 30;
                    return (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#00685F]">{m.lotNo}</td>
                        <td className="p-3 font-semibold text-slate-800">{m.name}</td>
                        <td className="p-3 font-mono text-slate-600">{m.ndc}</td>
                        <td className="p-3 text-slate-500">{m.mfgDate}</td>
                        <td className="p-3 font-mono">{m.expiryDate}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                              isUrgent
                                ? "bg-rose-100 text-rose-800 animate-pulse"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {m.daysToExpiry} days
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{m.shelfLocation}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">{m.stockUnits}</td>
                        <td className="p-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === "Critical Expiry"
                                ? "bg-rose-100 text-rose-800"
                                : m.status === "Low Stock"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-teal-100 text-teal-800"
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RX VERIFICATION QUEUE */}
        {activeTab === "prescriptions" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#DDE3EB] p-4 shadow-xs flex justify-between items-center">
              <div>
                <h2 className="font-bold text-base text-slate-900">E-Prescription Verification Intake</h2>
                <p className="text-xs text-slate-500">
                  Pharmacist intake verification queue compliant with fictional DEA schedule guidelines.
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200 font-bold">
                {state.pendingPrescriptions.length} Prescriptions In Queue
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.pendingPrescriptions.map((rx) => (
                <div key={rx.rxNumber} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-xs text-[#00685F]">{rx.rxNumber}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                      {rx.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{rx.patientName}</h3>
                    <p className="text-xs text-slate-500 font-mono">DOB: {rx.patientDob} • MRN: {rx.patientMrn}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                    <p className="font-bold text-slate-800">{rx.medicationName}</p>
                    <p className="text-slate-600 italic">"{rx.dosageSig}"</p>
                    <p className="text-[11px] text-slate-400">Prescriber: {rx.prescriberName} ({rx.clinic})</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-emerald-800 font-bold">Co-pay: ${rx.insuranceCopayUsd.toFixed(2)}</span>
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          activePatientRx: rx,
                        }));
                        setActiveTab("dispensary");
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#00685F] hover:bg-[#00524B] text-white transition-colors"
                    >
                      Load into Dispensing Terminal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WHOLESALE PHARMACEUTICAL POS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#DDE3EB] p-4 shadow-xs flex justify-between items-center">
              <div>
                <h2 className="font-bold text-base text-slate-900">Wholesale Replenishment & Purchase Orders</h2>
                <p className="text-xs text-slate-500">
                  Direct EDI linkage to accredited pharmaceutical distributors (AmerisourceBergen, McKesson).
                </p>
              </div>
              <button
                onClick={() => {
                  const newPo: PurchaseOrder = {
                    poNumber: `PO-MED-${Math.floor(10000 + Math.random() * 90000)}`,
                    supplier: "Cardinal Health Direct",
                    itemsSummary: "Broad Spectrum Antibiotics & Sterile Syringes",
                    unitsOrdered: 450,
                    totalCostUsd: 3150.0,
                    expectedDate: "In 2 days",
                    status: "In Transit",
                  };
                  setState((prev) => ({
                    ...prev,
                    purchaseOrders: [newPo, ...prev.purchaseOrders],
                  }));
                }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#00685F] text-white hover:bg-[#00524B] flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Generate Stock Reorder PO</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.purchaseOrders.map((po) => (
                <div key={po.poNumber} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#00685F]">{po.poNumber}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        po.status === "Received"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800 animate-pulse"
                      }`}
                    >
                      {po.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{po.supplier}</h3>
                  <p className="text-xs text-slate-600 font-mono">{po.itemsSummary}</p>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Ordered: {po.unitsOrdered} units</span>
                    <span className="font-mono font-bold text-slate-900">${po.totalCostUsd.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUARANTINE REGISTER */}
        {activeTab === "quarantine" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#DDE3EB] p-4 shadow-xs flex justify-between items-center">
              <div>
                <h2 className="font-bold text-base text-slate-900">Quarantine & Defective Lot Register</h2>
                <p className="text-xs text-slate-500">
                  Isolated hazardous, recalled, or expired formulations barred from counter dispensing.
                </p>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full font-bold">
                {state.quarantineLots.length} Quarantined Lots
              </span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
              {state.quarantineLots.map((q) => (
                <div key={q.lotNo} className="p-4 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono font-bold text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {q.lotNo}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{q.medication}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700">{q.units} units quarantined</span>
                  </div>
                  <p className="text-xs text-rose-900 font-medium">Reason: {q.reason}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Quarantine Date: {q.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DISPENSING LEDGER */}
        {activeTab === "ledger" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#DDE3EB] p-4 shadow-xs flex justify-between items-center">
              <div>
                <h2 className="font-bold text-base text-slate-900">Pharmacist Dispensing Audit Ledger</h2>
                <p className="text-xs text-slate-500">
                  Tamper-evident log of all dispensed prescriptions with timestamp, patient, and lot traceability.
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-bold">
                {state.dispensedLedger.length} Total Dispenses
              </span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 font-mono">
                    <th className="p-3">Dispense ID</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Rx #</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Medication</th>
                    <th className="p-3">Lot Used</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-right">Co-Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {state.dispensedLedger.map((d) => (
                    <tr key={d.dispenseId} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500">{d.dispenseId}</td>
                      <td className="p-3 text-slate-500 font-sans">{d.timestamp}</td>
                      <td className="p-3 font-bold text-[#00685F]">{d.rxNumber}</td>
                      <td className="p-3 font-sans font-semibold text-slate-800">{d.patientName}</td>
                      <td className="p-3 font-sans text-slate-700">{d.medicationName}</td>
                      <td className="p-3 text-teal-800">{d.lotNo}</td>
                      <td className="p-3 text-right font-bold text-slate-900">{d.qty}</td>
                      <td className="p-3 text-right font-bold text-emerald-800">${d.totalUsd.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: LOG NEW BATCH LOT */}
      {isAddLotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-base text-slate-900">Induct New Pharmaceutical Batch Lot</h3>
              <button onClick={() => setIsAddLotModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewLot} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Medication Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ciprofloxacin HCl"
                  value={newLotForm.name}
                  onChange={(e) => setNewLotForm({ ...newLotForm, name: e.target.value })}
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-[#00685F]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NDC National Drug Code</label>
                  <input
                    type="text"
                    placeholder="0029-4410-12"
                    value={newLotForm.ndc}
                    onChange={(e) => setNewLotForm({ ...newLotForm, ndc: e.target.value })}
                    className="w-full border rounded p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Batch Lot #</label>
                  <input
                    type="text"
                    placeholder="LOT-CIPRO-2026"
                    value={newLotForm.lotNo}
                    onChange={(e) => setNewLotForm({ ...newLotForm, lotNo: e.target.value })}
                    className="w-full border rounded p-2 font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newLotForm.category}
                    onChange={(e) => setNewLotForm({ ...newLotForm, category: e.target.value as any })}
                    className="w-full border rounded p-2"
                  >
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Cold Chain / Biologics">Cold Chain / Biologics</option>
                    <option value="Pain & Analgesics">Pain & Analgesics</option>
                    <option value="Cardiac / Chronic Care">Cardiac / Chronic Care</option>
                    <option value="General OTC">General OTC</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Formulation</label>
                  <input
                    type="text"
                    placeholder="500mg Film-Coated Tab"
                    value={newLotForm.formulation}
                    onChange={(e) => setNewLotForm({ ...newLotForm, formulation: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Units</label>
                  <input
                    type="number"
                    value={newLotForm.stockUnits}
                    onChange={(e) => setNewLotForm({ ...newLotForm, stockUnits: e.target.value })}
                    className="w-full border rounded p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shelf Expiry Date</label>
                  <input
                    type="date"
                    value={newLotForm.expiryDate}
                    onChange={(e) => setNewLotForm({ ...newLotForm, expiryDate: e.target.value })}
                    className="w-full border rounded p-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLotModalOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded font-bold text-white bg-[#00685F] hover:bg-[#00524B] shadow-xs"
                >
                  Confirm Batch Intake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DISPENSE CONFIRMATION */}
      {dispenseSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Rx Dispense Verified & Printed</h3>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {lastDispensedSummary}
            </p>
            <p className="text-[11px] text-slate-400">
              Stock balance decremented, pharmacist audit stamp logged, and label dispatched to high-speed thermal dispenser.
            </p>
            <button
              onClick={() => setDispenseSuccessModal(false)}
              className="w-full py-2 rounded-lg bg-[#00685F] text-white font-bold text-xs shadow-xs hover:bg-[#00524B]"
            >
              Continue Dispensary Operations
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
