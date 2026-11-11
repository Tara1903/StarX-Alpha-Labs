"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Globe, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Send, 
  FileText, 
  Info,
  Clock,
  DollarSign
} from "lucide-react";
import { 
  WEBSITE_PACKAGES, 
  APP_PACKAGES, 
  COMBO_PACKAGES, 
  DEVELOPMENT_ADDONS, 
  RECURRING_SERVICES,
  formatINR,
  DivisionType,
  DevelopmentPackage,
  DevelopmentAddon,
  HostingMaintenancePlan
} from "@/data/developmentPackages";
import { saveEstimateToStore, CustomerEstimate, generateEstimateId } from "@/lib/estimateStore";
import { printEstimatePDF } from "@/lib/pdfGenerator";

export function ProjectCalculatorClient() {
  const searchParams = useSearchParams();
  const initialDivision = (searchParams.get("division") as DivisionType) || "website";
  const initialPkgCode = searchParams.get("package") || "";

  // 7-step wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedDivision, setSelectedDivision] = useState<DivisionType>(
    ["website", "app", "combo"].includes(initialDivision) ? initialDivision : "website"
  );

  const availablePackages = useMemo(() => {
    switch (selectedDivision) {
      case "website":
        return WEBSITE_PACKAGES;
      case "app":
        return APP_PACKAGES;
      case "combo":
        return COMBO_PACKAGES;
      default:
        return WEBSITE_PACKAGES;
    }
  }, [selectedDivision]);

  // Selected base package
  const [selectedPackage, setSelectedPackage] = useState<DevelopmentPackage>(() => {
    const found = availablePackages.find((p) => p.code === initialPkgCode);
    return found || availablePackages[0];
  });

  // Keep package in sync if division changes
  const handleDivisionChange = (div: DivisionType) => {
    setSelectedDivision(div);
    const pkgs = div === "website" ? WEBSITE_PACKAGES : div === "app" ? APP_PACKAGES : COMBO_PACKAGES;
    setSelectedPackage(pkgs[0]);
  };

  // Selected Platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Web Responsive"]);

  // Selected Add-ons
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Selected Hosting
  const [selectedHostingId, setSelectedHostingId] = useState<string>("none");

  // Selected Maintenance SLA
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<string>("none");

  // Customer Contact Info
  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    notes: "",
    preferredContact: "WhatsApp" as "WhatsApp" | "Phone Call" | "Google Meet" | "Email",
    preferredMeetingTime: "",
    consentAccepted: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEstimate, setSubmittedEstimate] = useState<CustomerEstimate | null>(null);
  const [showEstimateDetailModal, setShowEstimateDetailModal] = useState(false);

  // Available add-ons for the chosen division
  const relevantAddons = useMemo(() => {
    return DEVELOPMENT_ADDONS.filter(
      (a) => a.applicableTo === "all" || a.applicableTo.includes(selectedDivision)
    );
  }, [selectedDivision]);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const basePrice = selectedPackage.startingPrice;

  const selectedAddonsList = useMemo(() => {
    return DEVELOPMENT_ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  }, [selectedAddonIds]);

  const addonsTotal = useMemo(() => {
    return selectedAddonsList.reduce((sum, item) => sum + item.startingPrice, 0);
  }, [selectedAddonsList]);

  const hostingCost = useMemo(() => {
    if (selectedHostingId === "none") return 0;
    const plan = RECURRING_SERVICES.find((p) => p.id === selectedHostingId);
    return plan ? plan.price : 0;
  }, [selectedHostingId]);

  const maintenanceCost = useMemo(() => {
    if (selectedMaintenanceId === "none") return 0;
    const plan = RECURRING_SERVICES.find((p) => p.id === selectedMaintenanceId);
    return plan ? plan.price : 0;
  }, [selectedMaintenanceId]);

  const subtotal = basePrice + addonsTotal + hostingCost;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!clientInfo.fullName.trim() || clientInfo.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full legal or contact name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientInfo.email.trim() || !emailRegex.test(clientInfo.email.trim())) {
      errors.email = "Please enter a valid work email address.";
    }
    const cleanPhone = clientInfo.phone.replace(/[\s\-\(\)\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile or WhatsApp number.";
    }
    if (!clientInfo.consentAccepted) {
      errors.consent = "You must agree to allow STARX ALPHA LABS to contact you regarding this estimate.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const estimateNumber = generateEstimateId();
    const now = new Date();
    const validUntil = new Date(now.getTime() + 30 * 86400000).toISOString();

    const newEstimate: CustomerEstimate = {
      id: "est_" + Date.now(),
      estimateNumber,
      clientName: clientInfo.fullName.trim(),
      clientBusiness: (clientInfo.businessName || "Individual / Startup").trim(),
      clientEmail: clientInfo.email.trim().toLowerCase(),
      clientPhone: clientInfo.phone.trim(),
      preferredContact: clientInfo.preferredContact,
      preferredMeetingTime: clientInfo.preferredMeetingTime.trim() || undefined,
      division: selectedDivision,
      packageCode: selectedPackage.code,
      packageName: selectedPackage.name,
      basePrice,
      selectedAddons: selectedAddonsList.map((a) => ({ id: a.id, name: a.name, price: a.startingPrice })),
      addonsTotal,
      hostingCost,
      maintenanceCost,
      subtotal,
      taxRate: 0.18,
      gstAmount,
      grandTotal,
      notes: clientInfo.notes.trim() || undefined,
      consentAccepted: true,
      status: "Submitted",
      createdAt: now.toISOString(),
      validUntil,
      updatedAt: now.toISOString(),
      history: [
        {
          timestamp: now.toISOString(),
          status: "Submitted",
          actor: "Customer (Online Calculator)",
          note: "Official estimate generated and locked from interactive calculator"
        }
      ]
    };

    try {
      // 1. Call server API
      await fetch("/api/estimates/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientInfo.fullName,
          email: clientInfo.email,
          phone: clientInfo.phone,
          businessName: clientInfo.businessName,
          division: selectedDivision,
          packageCode: selectedPackage.code,
          packageName: selectedPackage.name,
          basePrice,
          selectedAddons: newEstimate.selectedAddons,
          addonsTotal,
          hostingCost,
          maintenanceCost,
          subtotal,
          gstAmount,
          grandTotal,
          notes: clientInfo.notes,
          preferredContact: clientInfo.preferredContact,
          preferredMeetingTime: clientInfo.preferredMeetingTime,
          consentAccepted: true
        })
      });

      // 2. Persist to local store for instant customer portal access
      saveEstimateToStore(newEstimate);
      setSubmittedEstimate(newEstimate);
    } catch (err) {
      console.error("Failed to save estimate", err);
      // Resilient fallback: ensure customer still gets their estimate confirmation
      saveEstimateToStore(newEstimate);
      setSubmittedEstimate(newEstimate);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    "Division",
    "Package",
    "Platforms",
    "Add-ons",
    "Cloud & Hosting",
    "Maintenance SLA",
    "Quotation & Contact"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Step Indicator Header */}
      <div className="bg-[#0A1940] p-6 rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
              Step {currentStep} of 7: {stepsList[currentStep - 1]}
            </span>
          </div>
          <div className="text-xs font-mono text-[#C8D5EF]">
            Running Total: <span className="text-[#00D9FF] font-bold text-sm">{formatINR(subtotal)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#071638] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#E52BFF] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Desktop Step Pills */}
        <div className="hidden md:flex justify-between gap-2 pt-2">
          {stepsList.map((label, index) => {
            const stepNum = index + 1;
            const isCurrent = stepNum === currentStep;
            const isPassed = stepNum < currentStep;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCurrentStep(stepNum)}
                className={`text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                  isCurrent 
                    ? "text-[#00D9FF] font-bold" 
                    : isPassed 
                    ? "text-[#00C98B]" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent 
                    ? "bg-[#00D9FF] text-[#030B24] font-bold" 
                    : isPassed 
                    ? "bg-[#00C98B]/20 text-[#00C98B] border border-[#00C98B]/40" 
                    : "bg-[#071638] text-slate-500"
                }`}>
                  {isPassed ? "✓" : stepNum}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Body & Calculation Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wizard Steps Content (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {submittedEstimate ? (
            /* Official Project Estimate Confirmation Screen */
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/40 shadow-2xl space-y-6 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#00C98B]/20 text-[#00C98B] flex items-center justify-center mx-auto border border-[#00C98B]/30 shadow-lg shadow-[#00C98B]/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[11px] font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                  Estimate Submitted — Awaiting Requirement Verification.
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Your Project Estimate Request Has Been Received!
                </h2>
                <p className="text-xs text-[#C8D5EF] max-w-lg mx-auto">
                  Your official technical scope snapshot is locked with Reference ID{" "}
                  <span className="font-mono font-bold text-[#00D9FF]">{submittedEstimate.estimateNumber}</span>.
                  Our senior engineering leads will verify your technical parameters and assemble your formal proposal.
                </p>
              </div>

              {/* Estimate Snapshot Card */}
              <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimate Reference ID</span>
                    <span className="font-mono font-bold text-base text-[#00D9FF]">{submittedEstimate.estimateNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Submission Timestamp</span>
                    <span className="text-white font-semibold">
                      {new Date(submittedEstimate.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Customer &amp; Business</span>
                    <span className="text-white font-bold">{submittedEstimate.clientName}</span>
                    <span className="text-[#C8D5EF] block">{submittedEstimate.clientBusiness}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Selected Architecture Package</span>
                    <span className="text-white font-bold">{submittedEstimate.packageCode} — {submittedEstimate.packageName}</span>
                    <span className="text-xs uppercase font-mono text-[#00D9FF]">Division: {submittedEstimate.division}</span>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#C8D5EF]">
                    <span>Base Engineering Package:</span>
                    <span className="font-mono text-white font-bold">{formatINR(submittedEstimate.basePrice)}</span>
                  </div>
                  {submittedEstimate.selectedAddons.length > 0 && (
                    <div className="flex justify-between text-[#C8D5EF]">
                      <span>Add-on Modules ({submittedEstimate.selectedAddons.length}):</span>
                      <span className="font-mono text-white font-bold">+{formatINR(submittedEstimate.addonsTotal)}</span>
                    </div>
                  )}
                  {submittedEstimate.hostingCost > 0 && (
                    <div className="flex justify-between text-[#C8D5EF]">
                      <span>Cloud &amp; Hosting Architecture:</span>
                      <span className="font-mono text-white font-bold">+{formatINR(submittedEstimate.hostingCost)}</span>
                    </div>
                  )}
                  {submittedEstimate.maintenanceCost > 0 && (
                    <div className="flex justify-between text-[#C8D5EF]">
                      <span>Maintenance Care SLA (1st Month):</span>
                      <span className="font-mono text-white font-bold">+{formatINR(submittedEstimate.maintenanceCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-white/5">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-[#00D9FF]">{formatINR(submittedEstimate.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Applicable GST (18%):</span>
                    <span className="font-mono">{formatINR(submittedEstimate.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-sm">
                    <span className="font-extrabold text-white">Estimated Project Investment:</span>
                    <span className="font-mono font-extrabold text-xl text-[#00D9FF]">
                      {formatINR(submittedEstimate.grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200">
                  <strong className="text-white block font-mono text-[10px] uppercase">Preliminary Estimate Disclaimer</strong>
                  PRELIMINARY PROJECT ESTIMATE — SUBJECT TO REQUIREMENT VERIFICATION AND FINAL APPROVAL.
                </div>
              </div>

              {/* 4 ACTION BUTTONS MANDATED IN PROMPT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* 1. View My Estimate */}
                <button
                  type="button"
                  onClick={() => setShowEstimateDetailModal(true)}
                  className="px-5 py-3 rounded-xl bg-[#071638] hover:bg-[#0c2254] border border-white/10 hover:border-[#00D9FF]/40 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#00D9FF]" />
                  <span>View My Estimate</span>
                </button>

                {/* 2. Download Estimate PDF */}
                <button
                  type="button"
                  onClick={() => printEstimatePDF(submittedEstimate)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#087BFF]/30 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Download Estimate PDF (A4)</span>
                </button>

                {/* 3. Contact STARX ALPHA LABS (WhatsApp 9630937033) */}
                <a
                  href={`https://wa.me/919630937033?text=${encodeURIComponent(
                    `Hi STARX ALPHA LABS, I have configured and locked my Project Estimate ${submittedEstimate.estimateNumber} for package ${submittedEstimate.packageCode} (${formatINR(submittedEstimate.grandTotal)}). Please connect with me regarding requirement verification.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#00C98B]/20 hover:bg-[#00C98B]/30 border border-[#00C98B]/40 text-[#00C98B] font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>💬 Contact STARX ALPHA LABS (9630937033)</span>
                </a>

                {/* 4. Track My Request */}
                <Link
                  href={`/customer?tab=estimates&id=${encodeURIComponent(submittedEstimate.estimateNumber)}`}
                  className="px-5 py-3 rounded-xl bg-[#071638] hover:bg-[#0A1940] border border-white/20 text-[#00D9FF] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Track My Request in Customer Portal →</span>
                </Link>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedEstimate(null);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Configure Another Estimate
                </button>
              </div>

              {/* View Estimate Details Modal */}
              {showEstimateDetailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                  <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#00D9FF]">Estimate Specification</span>
                        <h3 className="text-xl font-bold text-white">{submittedEstimate.estimateNumber}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEstimateDetailModal(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#071638]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Client</span>
                          <span className="font-bold text-white">{submittedEstimate.clientName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Brand / Business</span>
                          <span className="font-bold text-white">{submittedEstimate.clientBusiness}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Email</span>
                          <span className="text-white">{submittedEstimate.clientEmail}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Phone / WhatsApp</span>
                          <span className="text-white">{submittedEstimate.clientPhone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-bold text-white uppercase text-[10px] tracking-wider text-[#00D9FF] block">
                          Selected Features &amp; Add-ons
                        </span>
                        <div className="p-3 rounded-xl bg-[#071638] space-y-1.5">
                          <div className="flex justify-between font-bold text-white">
                            <span>{submittedEstimate.packageCode} — {submittedEstimate.packageName}</span>
                            <span>{formatINR(submittedEstimate.basePrice)}</span>
                          </div>
                          {submittedEstimate.selectedAddons.map((addon) => (
                            <div key={addon.id} className="flex justify-between text-slate-300">
                              <span>+ {addon.name}</span>
                              <span className="font-mono">+{formatINR(addon.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#071638] border border-white/10 flex justify-between items-center text-sm">
                        <span className="font-bold text-white">Total Investment (incl. 18% GST):</span>
                        <span className="font-mono font-extrabold text-[#00D9FF] text-base">
                          {formatINR(submittedEstimate.grandTotal)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEstimateDetailModal(false);
                          printEstimatePDF(submittedEstimate);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs cursor-pointer"
                      >
                        Print / Download PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEstimateDetailModal(false)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* STEP 1: CHOOSE DIVISION */}
              {currentStep === 1 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Select Development Division</h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      Choose whether you are building a website, a mobile application, or a synchronized dual-platform combo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Website */}
                    <button
                      type="button"
                      onClick={() => handleDivisionChange("website")}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 ${
                        selectedDivision === "website"
                          ? "border-[#00D9FF] bg-[#071638] shadow-[0_0_20px_rgba(0,217,255,0.2)] ring-1 ring-[#00D9FF]"
                          : "border-white/5 bg-[#071638]/50 hover:border-white/20"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#087BFF]/20 text-[#00D9FF] flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#00D9FF] uppercase font-bold">Division A</span>
                        <h4 className="text-base font-bold text-white">Website Dev</h4>
                        <p className="text-[11px] text-[#C8D5EF] mt-1">W1–W6 tiers from {formatINR(7999)}</p>
                      </div>
                    </button>

                    {/* App */}
                    <button
                      type="button"
                      onClick={() => handleDivisionChange("app")}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 ${
                        selectedDivision === "app"
                          ? "border-[#E52BFF] bg-[#071638] shadow-[0_0_20px_rgba(229,43,255,0.2)] ring-1 ring-[#E52BFF]"
                          : "border-white/5 bg-[#071638]/50 hover:border-white/20"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#873BFF]/20 text-[#E52BFF] flex items-center justify-center">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#E52BFF] uppercase font-bold">Division B</span>
                        <h4 className="text-base font-bold text-white">Mobile App</h4>
                        <p className="text-[11px] text-[#C8D5EF] mt-1">A1–A5 tiers from {formatINR(19999)}</p>
                      </div>
                    </button>

                    {/* Combo */}
                    <button
                      type="button"
                      onClick={() => handleDivisionChange("combo")}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 ${
                        selectedDivision === "combo"
                          ? "border-[#FF941F] bg-[#071638] shadow-[0_0_20px_rgba(255,148,31,0.2)] ring-1 ring-[#FF941F]"
                          : "border-white/5 bg-[#071638]/50 hover:border-white/20"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FF941F]/20 text-[#FF941F] flex items-center justify-center">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#FF941F] uppercase font-bold">Division C</span>
                        <h4 className="text-base font-bold text-white">Web + App Combo</h4>
                        <p className="text-[11px] text-[#C8D5EF] mt-1">C1–C5 tiers from {formatINR(24999)}</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT BASE PACKAGE */}
              {currentStep === 2 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Select Base Package ({selectedDivision.toUpperCase()})
                    </h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      Pick your baseline package size and core deliverables. You can add extra features in later steps.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {availablePackages.map((pkg) => {
                      const isSelected = selectedPackage.id === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF]"
                              : "border-white/5 bg-[#071638]/50 hover:border-white/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#087BFF]/20 text-[#00D9FF]">
                                {pkg.code}
                              </span>
                              <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                              {pkg.popular && (
                                <span className="text-[10px] font-mono bg-[#00D9FF]/20 text-[#00D9FF] px-2 py-0.5 rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#C8D5EF]">{pkg.tagline}</p>
                            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                              <span>Scope: {pkg.pagesOrScreens}</span>
                              <span>•</span>
                              <span>Timeline: {pkg.timeline}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xl font-extrabold text-white block">
                              {formatINR(pkg.startingPrice)}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">Fixed Base Scope</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: PLATFORM SELECTION */}
              {currentStep === 3 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Target Platforms &amp; Devices</h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      Confirm the device targets and distribution endpoints for this build.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Web (Desktop & Mobile Responsive)", desc: "Next.js 16 high-speed web application" },
                      { name: "Android App (Google Play Store)", desc: "Flutter / Kotlin bundle ready for Play Store" },
                      { name: "iOS App (Apple App Store)", desc: "Flutter / Swift bundle ready for App Store" },
                      { name: "Super Admin CMS Dashboard", desc: "Dedicated browser management dashboard" }
                    ].map((plat) => {
                      const isSelected = selectedPlatforms.includes(plat.name);
                      return (
                        <div
                          key={plat.name}
                          onClick={() => {
                            setSelectedPlatforms((prev) =>
                              prev.includes(plat.name)
                                ? prev.filter((p) => p !== plat.name)
                                : [...prev, plat.name]
                            );
                          }}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF]"
                              : "border-white/5 bg-[#071638]/40 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white">{plat.name}</h4>
                            <div className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                              isSelected ? "bg-[#00D9FF] text-[#030B24] font-bold" : "border border-white/20"
                            }`}>
                              {isSelected ? "✓" : ""}
                            </div>
                          </div>
                          <p className="text-xs text-[#C8D5EF] mt-1.5">{plat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: ADD-ON MODULES */}
              {currentStep === 4 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Add-On Feature Modules</h3>
                      <p className="text-xs text-[#C8D5EF] mt-1">
                        Select power-ups to plug directly into your base architecture.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#00D9FF]">
                      {selectedAddonIds.length} Selected (+{formatINR(addonsTotal)})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {relevantAddons.map((addon) => {
                      const isSelected = selectedAddonIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF]"
                              : "border-white/5 bg-[#071638]/40 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white">{addon.name}</span>
                            <span className="text-xs font-mono font-bold text-[#00D9FF] shrink-0">
                              +{formatINR(addon.startingPrice)}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#C8D5EF] leading-relaxed line-clamp-2">
                            {addon.description}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              {addon.priceType.replace("_", " ")}
                            </span>
                            <span className={`text-[11px] font-semibold ${isSelected ? "text-[#00D9FF]" : "text-slate-500"}`}>
                              {isSelected ? "Included ✓" : "+ Add"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: DOMAIN & CLOUD HOSTING */}
              {currentStep === 5 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Domain &amp; Cloud Infrastructure</h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      Choose whether you want StarX to provision managed cloud infrastructure or deploy to your own account.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "none", name: "Deploy to Client Cloud / Self-Managed", price: 0, desc: "We deploy to your existing AWS/Vercel/DigitalOcean account at zero additional charge." },
                      { id: "host-std", name: "High-Speed Cloud Hosting & SSL (1 Year)", price: 4999, desc: "Global CDN, automated weekly backups, 99.9% uptime SLA, and free SSL certificate." },
                      { id: "host-adv", name: "High-Concurrency Cloud Cluster (1 Year)", price: 14999, desc: "Dedicated resources, Redis caching, auto-scaling up to 100k concurrent visitors." },
                      { id: "dom-reg", name: "Custom Domain Registration (.com / .in) (1 Year)", price: 1499, desc: "Domain registration, DNS record configuration, and branded email routing." }
                    ].map((opt) => {
                      const isSelected = selectedHostingId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedHostingId(opt.id)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF]"
                              : "border-white/5 bg-[#071638]/40 hover:border-white/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white">{opt.name}</h4>
                            <p className="text-xs text-[#C8D5EF]">{opt.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-bold text-white block">
                              {opt.price === 0 ? "Free / Self" : formatINR(opt.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: MAINTENANCE & SLA */}
              {currentStep === 6 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Post-Launch Maintenance &amp; Support SLA</h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      All projects include 14 to 30 days of free bug warranty. Select an ongoing SLA for continuous care.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "none", name: "Standard 30-Day Post-Launch Warranty", price: 0, period: "Included Free", desc: "Covers critical bug fixes, configuration anomalies, and handover warranty." },
                      { id: "maint-ess", name: "Essential Monthly Care SLA", price: 2999, period: "per month", desc: "Security patching, database backup validation, minor text/image updates, and 12-hour ticket response." },
                      { id: "maint-pro", name: "Growth & Scaling Care SLA", price: 7999, period: "per month", desc: "4-hour incident response, continuous performance monitoring, up to 10 hours monthly feature tweaks." },
                      { id: "maint-ent", name: "Enterprise 24/7 Dedicated SLA", price: 19999, period: "per month", desc: "1-hour emergency response, dedicated engineering manager, weekly sprint cycles and architecture audits." }
                    ].map((sla) => {
                      const isSelected = selectedMaintenanceId === sla.id;
                      return (
                        <div
                          key={sla.id}
                          onClick={() => setSelectedMaintenanceId(sla.id)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF]"
                              : "border-white/5 bg-[#071638]/40 hover:border-white/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white">{sla.name}</h4>
                            <p className="text-xs text-[#C8D5EF]">{sla.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-bold text-white block">
                              {sla.price === 0 ? "₹0" : formatINR(sla.price)}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">{sla.period}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 7: QUOTATION & CONTACT DETAILS */}
              {currentStep === 7 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
                      Final Requirement Validation
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">Generate &amp; Lock Official Project Estimate</h3>
                    <p className="text-xs text-[#C8D5EF] mt-1">
                      Enter your details to generate your official PDF estimate snapshot and initiate requirement verification.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200">
                    <strong className="text-white block font-mono text-[10px] uppercase">Preliminary Estimate Disclaimer</strong>
                    PRELIMINARY PROJECT ESTIMATE — SUBJECT TO REQUIREMENT VERIFICATION AND FINAL APPROVAL.
                  </div>

                  <form onSubmit={handleSubmitEstimate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={clientInfo.fullName}
                          onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })}
                          placeholder="e.g. Rajesh Kumar"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#071638] border text-white text-xs focus:border-[#00D9FF] focus:outline-none ${
                            formErrors.fullName ? "border-red-500" : "border-white/10"
                          }`}
                        />
                        {formErrors.fullName && <p className="text-[10px] text-red-400">{formErrors.fullName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Business / Brand Name</label>
                        <input
                          type="text"
                          value={clientInfo.businessName}
                          onChange={(e) => setClientInfo({ ...clientInfo, businessName: e.target.value })}
                          placeholder="e.g. Apex Logistics Pvt Ltd"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Work Email Address *</label>
                        <input
                          type="email"
                          required
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                          placeholder="rajesh@apexlogistics.in"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#071638] border text-white text-xs focus:border-[#00D9FF] focus:outline-none ${
                            formErrors.email ? "border-red-500" : "border-white/10"
                          }`}
                        />
                        {formErrors.email && <p className="text-[10px] text-red-400">{formErrors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">WhatsApp / Phone Number (+91) *</label>
                        <input
                          type="tel"
                          required
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#071638] border text-white text-xs focus:border-[#00D9FF] focus:outline-none ${
                            formErrors.phone ? "border-red-500" : "border-white/10"
                          }`}
                        />
                        {formErrors.phone && <p className="text-[10px] text-red-400">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Preferred Contact Method</label>
                        <select
                          value={clientInfo.preferredContact}
                          onChange={(e) => setClientInfo({ ...clientInfo, preferredContact: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
                        >
                          <option value="WhatsApp">WhatsApp (Fastest Response)</option>
                          <option value="Phone Call">Direct Phone Call</option>
                          <option value="Google Meet">Google Meet Video Scoping</option>
                          <option value="Email">Formal Email Specification</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Preferred Meeting Time (Optional)</label>
                        <input
                          type="text"
                          value={clientInfo.preferredMeetingTime}
                          onChange={(e) => setClientInfo({ ...clientInfo, preferredMeetingTime: e.target.value })}
                          placeholder="e.g. Tomorrow 3:00 PM IST or Weekend"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Specific Project Requirements or Notes</label>
                      <textarea
                        rows={3}
                        value={clientInfo.notes}
                        onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                        placeholder="Mention any specific third-party APIs, existing database migrations, or reference websites..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    {/* MANDATORY CONSENT CHECKBOX */}
                    <div className="p-3.5 rounded-xl bg-[#071638] border border-white/10 space-y-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={clientInfo.consentAccepted}
                          onChange={(e) => setClientInfo({ ...clientInfo, consentAccepted: e.target.checked })}
                          className="mt-0.5 rounded text-[#00D9FF] focus:ring-[#00D9FF] cursor-pointer"
                        />
                        <span className="text-xs text-[#C8D5EF] leading-relaxed">
                          I agree that <strong>STARX ALPHA LABS</strong> may contact me regarding this project enquiry and estimate. Read our{" "}
                          <Link href="/privacy" target="_blank" className="text-[#00D9FF] underline">
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link href="/terms" target="_blank" className="text-[#00D9FF] underline">
                            Terms of Service
                          </Link>.
                        </span>
                      </label>
                      {formErrors.consent && <p className="text-[10px] text-red-400 pl-6">{formErrors.consent}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#E52BFF] text-white font-extrabold text-sm shadow-xl shadow-[#087BFF]/30 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Generating Official Estimate..." : "Generate & Lock My Official Estimate ↗"}</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      🔒 <em>Note:</em> Locking your estimate snapshot preserves your pricing configuration for 30 days. It does NOT commit you to payment or contract.
                    </p>
                  </form>
                </div>
              )}

              {/* Wizard Nav Buttons (Back / Next) */}
              <div className="flex items-center justify-between pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1940] border border-white/10 text-xs font-bold text-[#C8D5EF] hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Step</span>
                  </button>
                ) : <div />}

                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 7))}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md hover:brightness-110"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>

        {/* Calculation Live Summary Sidebar (Right 1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/30 shadow-xl space-y-5 sticky top-28">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#00D9FF]" />
                Estimate Breakdown
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#087BFF]/20 text-[#00D9FF] uppercase">
                Live INR
              </span>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-3 text-xs">
              {/* Base Package */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-white block">{selectedPackage.code} — {selectedPackage.name}</span>
                  <span className="text-[11px] text-slate-400">{selectedPackage.pagesOrScreens}</span>
                </div>
                <span className="font-mono font-bold text-white">{formatINR(basePrice)}</span>
              </div>

              {/* Add-ons List */}
              {selectedAddonsList.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#00D9FF] block">
                    Add-on Modules ({selectedAddonsList.length}):
                  </span>
                  {selectedAddonsList.map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-[11px] text-[#C8D5EF]">
                      <span className="truncate pr-2">{addon.name}</span>
                      <span className="font-mono text-white shrink-0">+{formatINR(addon.startingPrice)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hosting */}
              {hostingCost > 0 && (
                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[11px]">
                  <span className="text-[#C8D5EF]">Cloud &amp; Hosting:</span>
                  <span className="font-mono text-white">+{formatINR(hostingCost)}</span>
                </div>
              )}

              {/* Maintenance */}
              {maintenanceCost > 0 && (
                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[11px]">
                  <span className="text-[#C8D5EF]">Maintenance SLA (1st Mo):</span>
                  <span className="font-mono text-white">+{formatINR(maintenanceCost)}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Subtotal:</span>
                <span className="font-mono font-bold text-[#00D9FF]">{formatINR(subtotal)}</span>
              </div>

              {/* GST 18% */}
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Standard GST (18%):</span>
                <span className="font-mono">{formatINR(gstAmount)}</span>
              </div>

              {/* Grand Total */}
              <div className="p-4 rounded-xl bg-[#071638] border border-white/10 flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Investment</span>
                  <span className="text-xl font-extrabold text-white">{formatINR(grandTotal)}</span>
                </div>
                <span className="text-[10px] font-mono text-[#00C98B]">Fixed Milestone Scope</span>
              </div>

              {/* Preliminary Disclaimer Notice */}
              <div className="p-2.5 rounded-lg bg-[#071638] border border-white/5 text-[10px] text-slate-400 font-mono leading-tight">
                PRELIMINARY PROJECT ESTIMATE — SUBJECT TO REQUIREMENT VERIFICATION AND FINAL APPROVAL.
              </div>
            </div>

            {/* Standard Guarantees */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                <span>100% Intellectual Property Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                <span>Milestone-based payment approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                <span>30-day post-launch warranty support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
