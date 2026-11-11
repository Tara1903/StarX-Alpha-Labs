"use client";

import React, { useState, useEffect } from "react";
import {
  WEBSITE_PACKAGES,
  APP_PACKAGES,
  COMBO_PACKAGES,
  DEVELOPMENT_ADDONS,
  formatINR,
  DivisionType,
  DevelopmentPackage,
} from "@/data/developmentPackages";
import { 
  Quotation, 
  getQuotations, 
  saveQuotationToStore, 
  generateProposalId 
} from "@/lib/quotationStore";
import { 
  ClientProject, 
  getClientProjects, 
  saveProjectToStore,
  activateProjectFromActivationFlow, 
  generateProjectId,
  getDefaultMilestones,
  ProjectLifecycleStatus,
  PROJECT_LIFECYCLE_STATUSES 
} from "@/lib/projectStore";
import { 
  CustomerEstimate, 
  getEstimates, 
  saveEstimateToStore, 
  updateEstimateStatus,
  updateEstimateRequirements,
  RequirementVerificationSpec 
} from "@/lib/estimateStore";
import { printEstimatePDF, printProposalPDF } from "@/lib/pdfGenerator";
import {
  Tag,
  FileText,
  FolderKanban,
  Calculator,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Search,
  Filter,
  Download,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckSquare,
  XCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface PricingPackagesModuleProps {
  estimates: CustomerEstimate[];
  quotations: Quotation[];
  projects: ClientProject[];
  onConvertEstimate: (est: CustomerEstimate) => void;
  onAdvanceProjectStage: (projectId: string, newStage: any) => void;
  onShowToast: (msg: string) => void;
}

export function PricingPackagesModule({
  estimates: propEstimates,
  quotations: propQuotations,
  projects: propProjects,
  onConvertEstimate,
  onAdvanceProjectStage,
  onShowToast,
}: PricingPackagesModuleProps) {
  const [subTab, setSubTab] = useState<"estimates" | "quotations" | "projects" | "packages">("estimates");
  const [division, setDivision] = useState<DivisionType>("website");

  // Local state synced with stores
  const [estimatesList, setEstimatesList] = useState<CustomerEstimate[]>(() => getEstimates());
  const [proposalsList, setProposalsList] = useState<Quotation[]>(() => getQuotations());
  const [projectsList, setProjectsList] = useState<ClientProject[]>(() => getClientProjects());

  // Filter states
  const [estimateFilter, setEstimateFilter] = useState<string>("all");
  const [estimateSearch, setEstimateSearch] = useState<string>("");

  // Modals
  const [activeEstimate, setActiveEstimate] = useState<CustomerEstimate | null>(null);
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [isProposalGeneratorOpen, setIsProposalGeneratorOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

  // Requirement Verification Form State (17 Fields from Section 9)
  const [reqForm, setReqForm] = useState<RequirementVerificationSpec>({
    businessObjective: "",
    projectType: "",
    targetAudience: "",
    requiredScreens: "",
    requiredUserRoles: "",
    customerDashboardReqs: "",
    adminDashboardReqs: "",
    requiredIntegrations: "",
    paymentGatewayReqs: "",
    databaseReqs: "",
    hostingRequirements: "",
    securityRequirements: "",
    referenceWebsites: "",
    designPreferences: "",
    contentAvailability: "",
    projectTimeline: "",
    additionalScope: ""
  });

  // Proposal Generator Form State
  const [propForm, setPropForm] = useState({
    projectTitle: "",
    projectOverview: "",
    scopeDescription: "",
    deliveryTimeline: "3-4 Weeks from Kickoff",
    timelineWeeks: 4,
    advancePercentage: 40,
    uatPercentage: 40,
    handoverPercentage: 20
  });

  // Meeting Form State
  const [meetingForm, setMeetingForm] = useState({
    status: "Scheduled" as any,
    scheduledTime: "",
    meetingUrl: "https://meet.google.com/starx-alpha-scope",
    consultantName: "Aarav Sharma (Principal Architect)",
    notes: ""
  });

  // Activation Checklist State
  const [activationChecklist, setActivationChecklist] = useState({
    proposalAccepted: true,
    agreementExecuted: true,
    advancePaymentVerified: true,
    advanceAmountPaid: 0,
    adminConfirmation: true
  });

  const refreshStores = () => {
    setEstimatesList(getEstimates());
    setProposalsList(getQuotations());
    setProjectsList(getClientProjects());
  };

  // Open Requirement Spec for an estimate
  const handleOpenRequirements = (est: CustomerEstimate) => {
    setActiveEstimate(est);
    setReqForm({
      businessObjective: est.requirements?.businessObjective || `Digital infrastructure development for ${est.clientBusiness}`,
      projectType: est.requirements?.projectType || `${est.packageName} (${est.division.toUpperCase()})`,
      targetAudience: est.requirements?.targetAudience || "Enterprise clients and internal staff",
      requiredScreens: est.requirements?.requiredScreens || "12-16 custom screens / cockpit views",
      requiredUserRoles: est.requirements?.requiredUserRoles || "Super Admin, Manager, Client User",
      customerDashboardReqs: est.requirements?.customerDashboardReqs || "Account portal, self-service tracking, invoice vault",
      adminDashboardReqs: est.requirements?.adminDashboardReqs || "Comprehensive management cockpit and audit trails",
      requiredIntegrations: est.requirements?.requiredIntegrations || "Mayank Singh UPI Gateway, Webhooks, REST APIs",
      paymentGatewayReqs: est.requirements?.paymentGatewayReqs || "Mayank Singh UPI QR & automated webhook settlement",
      databaseReqs: est.requirements?.databaseReqs || "Supabase PostgreSQL with Row Level Security",
      hostingRequirements: est.requirements?.hostingRequirements || "High availability edge deployment with automated SSL",
      securityRequirements: est.requirements?.securityRequirements || "JWT auth, encrypted storage, role-based access control",
      referenceWebsites: est.requirements?.referenceWebsites || "",
      designPreferences: est.requirements?.designPreferences || "StarX Alpha Labs Cyberpunk Dark System",
      contentAvailability: est.requirements?.contentAvailability || "Client to supply logos and domain DNS",
      projectTimeline: est.requirements?.projectTimeline || "3 to 4 Weeks",
      additionalScope: est.requirements?.additionalScope || est.notes || ""
    });
    setIsRequirementModalOpen(true);
  };

  const handleSaveRequirements = () => {
    if (!activeEstimate) return;
    const updated = updateEstimateRequirements(activeEstimate.id, reqForm, "Super Administrator");
    if (updated) {
      refreshStores();
      setActiveEstimate(updated);
      setIsRequirementModalOpen(false);
      onShowToast(`Requirements verified for ${activeEstimate.estimateNumber}`);
    }
  };

  // Open Proposal Generator
  const handleOpenProposalGenerator = (est: CustomerEstimate) => {
    setActiveEstimate(est);
    setPropForm({
      projectTitle: `${est.clientBusiness} — ${est.packageName}`,
      projectOverview: `An enterprise ${est.division} platform engineered for ${est.clientBusiness} to solve commercial operational bottlenecks.`,
      scopeDescription: `Full architectural build of ${est.packageCode} (${est.packageName}) including ${est.selectedAddons.length} functional add-on modules, responsive frontend, and backend database integrations.`,
      deliveryTimeline: "3 to 4 Weeks from Kickoff Signoff",
      timelineWeeks: 4,
      advancePercentage: 40,
      uatPercentage: 40,
      handoverPercentage: 20
    });
    setIsProposalGeneratorOpen(true);
  };

  const handleGenerateOfficialProposal = () => {
    if (!activeEstimate) return;
    const proposalNumber = generateProposalId();
    const now = new Date();
    const validUntil = new Date(now.getTime() + 30 * 86400000).toISOString();

    const advanceAmt = Math.round(activeEstimate.grandTotal * (propForm.advancePercentage / 100));
    const uatAmt = Math.round(activeEstimate.grandTotal * (propForm.uatPercentage / 100));
    const handoverAmt = Math.max(0, activeEstimate.grandTotal - advanceAmt - uatAmt);

    const newProposal: Quotation = {
      id: "prop_" + Date.now(),
      proposalNumber,
      estimateNumber: activeEstimate.estimateNumber,
      estimateId: activeEstimate.id,
      clientName: activeEstimate.clientName,
      clientBusiness: activeEstimate.clientBusiness,
      clientEmail: activeEstimate.clientEmail,
      clientPhone: activeEstimate.clientPhone,
      projectTitle: propForm.projectTitle,
      projectOverview: propForm.projectOverview,
      businessObjectives: [
        "Eliminate operational redundancies with automated workflows",
        "Deliver enterprise responsiveness and lightning fast edge performance",
        "Establish secure multi-tenant role-based access control"
      ],
      scopeDescription: propForm.scopeDescription,
      modules: [
        `${activeEstimate.packageName} Core Engine`,
        ...activeEstimate.selectedAddons.map((a) => a.name)
      ],
      features: [
        "100% Responsive Design Across All Devices",
        "Role-Based Authentication & Access Control",
        "Automated Invoicing & Payment Verification",
        "Production Health Monitoring & Audit Logs"
      ],
      pagesOrScreens: [
        "Dashboard Overview",
        "Management Cockpit",
        "Operational Data Vault",
        "Settings & Authentication"
      ],
      userRoles: ["Super Administrator", "Project Manager", "Client User"],
      customerDashboardFeatures: ["Self-service status tracking", "Automated PDF invoices", "Support desk"],
      adminDashboardFeatures: ["Complete data telemetry", "User roster", "Audit logs"],
      techStack: ["Next.js 16 (Turbopack)", "React 19", "Tailwind CSS v4", "Supabase PostgreSQL", "Mayank Singh UPI"],
      thirdPartyIntegrations: ["Mayank Singh UPI Gateway", "Google Maps Platform", "Fastag API"],
      designSpecifications: "StarX Alpha Labs Cyberpunk Dark System with electric blue and cyan accents.",
      items: [
        {
          id: "item_base",
          category: "Development",
          title: `Base Engineering: ${activeEstimate.packageCode} — ${activeEstimate.packageName}`,
          description: `Division: ${activeEstimate.division.toUpperCase()} core system architecture`,
          amount: activeEstimate.basePrice
        },
        ...activeEstimate.selectedAddons.map((a) => ({
          id: a.id,
          category: "Development" as const,
          title: a.name,
          description: "Optional functional add-on module",
          amount: a.price
        })),
        ...(activeEstimate.hostingCost > 0 ? [{
          id: "item_host",
          category: "Hosting & Cloud" as const,
          title: "Managed Cloud Edge Infrastructure",
          description: "Annual multi-region hosting and automated SSL",
          amount: activeEstimate.hostingCost
        }] : []),
        ...(activeEstimate.maintenanceCost > 0 ? [{
          id: "item_maint",
          category: "Maintenance & SLA" as const,
          title: "Priority Care SLA (Month 1)",
          description: "Vulnerability patching and monitoring",
          amount: activeEstimate.maintenanceCost
        }] : [])
      ],
      milestoneSchedules: [
        {
          milestoneNumber: 1,
          title: "Milestone 1 — Discovery & Architecture",
          deliverables: ["Technical SRS Document", "Database Schema", "High-fidelity UI mockups"],
          percentage: propForm.advancePercentage,
          amount: advanceAmt,
          duePeriod: "Week 1",
          approvalRequired: true
        },
        {
          milestoneNumber: 2,
          title: "Milestone 2 — Core Engine & Integration Build",
          deliverables: ["Full cockpit development", "API integrations", "Staging testing build"],
          percentage: propForm.uatPercentage,
          amount: uatAmt,
          duePeriod: "Week 3",
          approvalRequired: true
        },
        {
          milestoneNumber: 3,
          title: "Milestone 3 — Production Deployment & Handover",
          deliverables: ["Domain setup", "Source code repository transfer", "30-day warranty start"],
          percentage: propForm.handoverPercentage,
          amount: handoverAmt,
          duePeriod: "Week 4",
          approvalRequired: true
        }
      ],
      subtotal: activeEstimate.subtotal,
      discountAmount: 0,
      taxRate: 0.18,
      taxAmount: activeEstimate.gstAmount,
      totalAmount: activeEstimate.grandTotal,
      deliveryTimeline: propForm.deliveryTimeline,
      hostingAndRecurringCosts: "Standard annual hosting renewal applies after Year 1.",
      supportAndWarrantyTerms: [
        "30-day post-launch comprehensive bug warranty covering all approved scope deliverables.",
        "Rapid < 4-hour critical incident response time during IST business hours."
      ],
      exclusionsAndAssumptions: [
        "Client will provide domain DNS access and necessary third-party API credentials."
      ],
      changeRequestPolicy: "Any scope additions beyond the approved SRS will be evaluated under sprint addendums.",
      intellectualPropertyTerms: "100% complete source code ownership and repository access transferred upon final milestone settlement.",
      termsAndConditions: [
        "Quotation valid for 30 calendar days.",
        "Kickoff requires verified advance milestone clearance."
      ],
      validityDays: 30,
      validUntil,
      currentVersion: "v1.0",
      versions: [
        {
          versionNumber: "v1.0",
          createdAt: now.toISOString(),
          createdBy: "Super Administrator",
          changeSummary: `Official proposal assembled from Estimate ${activeEstimate.estimateNumber}`,
          subtotal: activeEstimate.subtotal,
          taxAmount: activeEstimate.gstAmount,
          totalAmount: activeEstimate.grandTotal,
          items: [],
          milestones: []
        }
      ],
      status: "Sent",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    saveQuotationToStore(newProposal);

    // Update estimate status
    updateEstimateStatus(
      activeEstimate.id,
      "Proposal Sent",
      "Super Administrator",
      `Assembled and dispatched Official Proposal ${proposalNumber}`
    );

    refreshStores();
    setIsProposalGeneratorOpen(false);
    onShowToast(`Official Proposal ${proposalNumber} generated and sent to ${activeEstimate.clientName}!`);
  };

  // Open Project Activation Check
  const handleOpenActivation = (est: CustomerEstimate) => {
    setActiveEstimate(est);
    const advancePaid = Math.round(est.grandTotal * 0.4);
    setActivationChecklist({
      proposalAccepted: est.status === "Proposal Accepted" || !!est.proposalId,
      agreementExecuted: true,
      advancePaymentVerified: true,
      advanceAmountPaid: advancePaid,
      adminConfirmation: true
    });
    setIsActivationModalOpen(true);
  };

  const handleConfirmProjectActivation = () => {
    if (!activeEstimate) return;
    if (!activationChecklist.proposalAccepted || !activationChecklist.agreementExecuted || !activationChecklist.advancePaymentVerified || !activationChecklist.adminConfirmation) {
      alert("All 4 Project Activation criteria are strictly required: 1. Accepted Proposal, 2. Executed Agreement, 3. Verified Advance Payment, 4. Admin Confirmation.");
      return;
    }

    const activatedProj = activateProjectFromActivationFlow({
      estimateNumber: activeEstimate.estimateNumber,
      proposalId: activeEstimate.proposalId || "prop-auto",
      proposalNumber: activeEstimate.proposalNumber || "STARX-PROP-2026-AUTO",
      agreementId: activeEstimate.agreementId || "agr-auto",
      paymentId: "pay-advance-verified",
      advanceAmountPaid: activationChecklist.advanceAmountPaid,
      clientName: activeEstimate.clientName,
      clientBusiness: activeEstimate.clientBusiness,
      clientEmail: activeEstimate.clientEmail,
      clientPhone: activeEstimate.clientPhone,
      projectName: `${activeEstimate.clientBusiness} — ${activeEstimate.packageName}`,
      division: activeEstimate.division,
      packageCode: activeEstimate.packageCode,
      totalCost: activeEstimate.grandTotal,
      adminConfirmedBy: "Super Administrator"
    });

    if (activatedProj) {
      updateEstimateStatus(
        activeEstimate.id,
        "Project Confirmed",
        "Super Administrator",
        `Project activated with ID ${activatedProj.projectCode}`
      );
      refreshStores();
      setIsActivationModalOpen(false);
      onShowToast(`Project ${activatedProj.projectCode} officially activated! Milestones initiated.`);
    }
  };

  const filteredEstimates = estimatesList.filter((e) => {
    const matchesSearch =
      e.estimateNumber.toLowerCase().includes(estimateSearch.toLowerCase()) ||
      e.clientBusiness.toLowerCase().includes(estimateSearch.toLowerCase()) ||
      e.clientName.toLowerCase().includes(estimateSearch.toLowerCase());
    const matchesFilter = estimateFilter === "all" || e.status === estimateFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* 1. Sub Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "estimates", label: `Estimate Requests (${estimatesList.length})`, icon: Calculator },
            { id: "quotations", label: `Official Proposals (${proposalsList.length})`, icon: FileText },
            { id: "projects", label: `Active Projects (${projectsList.length})`, icon: FolderKanban },
            { id: "packages", label: "Package Catalogs (W/A/C)", icon: Tag },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = subTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSubTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-md shadow-[#087BFF]/30"
                    : "bg-[#071638] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <a
          href="/project-calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 border border-[#00D9FF]/40 text-[#00D9FF] font-bold text-xs"
        >
          <span>Open Calculator ↗</span>
        </a>
      </div>

      {/* 2. SUBTAB: ESTIMATES MANAGEMENT HUB (Section 8) */}
      {subTab === "estimates" && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={estimateSearch}
                onChange={(e) => setEstimateSearch(e.target.value)}
                placeholder="Search by Estimate ID, Client Name, Business, or Package..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={estimateFilter}
                onChange={(e) => setEstimateFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
              >
                <option value="all">All Statuses ({estimatesList.length})</option>
                <option value="Submitted">New Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Requirement Clarification">Requirement Clarification</option>
                <option value="Proposal Prepared">Proposal Prepared</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Revision Requested">Revision Requested</option>
                <option value="Proposal Accepted">Proposal Accepted</option>
                <option value="Project Confirmed">Converted to Projects</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Estimates Table */}
          <div className="rounded-3xl bg-[#071638] border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Estimate ID</th>
                  <th className="py-3 px-4">Client &amp; Contact</th>
                  <th className="py-3 px-4">Package &amp; Division</th>
                  <th className="py-3 px-4">Subtotal / GST</th>
                  <th className="py-3 px-4">Status &amp; Stage</th>
                  <th className="py-3 px-4 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEstimates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 text-xs">
                      No customer estimate records match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredEstimates.map((est) => (
                    <tr key={est.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#00D9FF]">
                        {est.estimateNumber}
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          {new Date(est.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{est.clientName}</div>
                        <div className="text-slate-300 text-[11px]">{est.clientBusiness}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>{est.clientPhone}</span>
                          <span>•</span>
                          <a
                            href={`https://wa.me/${est.clientPhone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00C98B] hover:underline"
                          >
                            WhatsApp ↗
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{est.packageCode} — {est.packageName}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">{est.division} Division</div>
                        {est.selectedAddons.length > 0 && (
                          <div className="text-[10px] text-[#00D9FF] font-mono mt-0.5">
                            +{est.selectedAddons.length} Add-on Modules
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-white text-sm">{formatINR(est.grandTotal)}</div>
                        <div className="text-[10px] text-slate-400">Subtotal: {formatINR(est.subtotal)}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border uppercase ${
                          est.status === "Project Confirmed"
                            ? "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/40 font-bold"
                            : est.status === "Proposal Accepted"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            : est.status === "Proposal Sent"
                            ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        }`}>
                          {est.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {/* Download PDF */}
                        <button
                          type="button"
                          onClick={() => printEstimatePDF(est)}
                          title="Print / Save Estimate PDF"
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] cursor-pointer"
                        >
                          PDF
                        </button>

                        {/* Verify Requirements */}
                        <button
                          type="button"
                          onClick={() => handleOpenRequirements(est)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#087BFF]/20 hover:bg-[#087BFF]/30 border border-[#087BFF]/40 text-[#00D9FF] font-bold text-[10px] cursor-pointer"
                        >
                          Requirements (17)
                        </button>

                        {/* Generate Proposal */}
                        <button
                          type="button"
                          onClick={() => handleOpenProposalGenerator(est)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#00D9FF] hover:bg-white text-[#030B24] font-bold text-[10px] cursor-pointer"
                        >
                          Assemble Proposal →
                        </button>

                        {/* Activate Project (Enforces 4 Activation Criteria) */}
                        <button
                          type="button"
                          onClick={() => handleOpenActivation(est)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#00C98B] hover:brightness-110 text-slate-950 font-extrabold text-[10px] cursor-pointer"
                        >
                          Activate Project ✓
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SUBTAB: OFFICIAL PROPOSALS HUB (Section 10) */}
      {subTab === "quotations" && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-[#071638] border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Proposal #</th>
                  <th className="py-3 px-4">Client &amp; Project Title</th>
                  <th className="py-3 px-4">Version &amp; Milestones</th>
                  <th className="py-3 px-4">Total Investment</th>
                  <th className="py-3 px-4">Status &amp; Acceptance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {proposalsList.map((q) => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#00D9FF]">
                      {q.proposalNumber}
                      <div className="text-[10px] text-slate-400 font-mono">{q.estimateNumber}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{q.projectTitle}</div>
                      <div className="text-slate-300 text-[11px]">{q.clientBusiness} ({q.clientName})</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono text-white font-bold">{q.currentVersion}</div>
                      <div className="text-[10px] text-slate-400">{q.milestoneSchedules.length} Milestones Scheduled</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                      {formatINR(q.totalAmount)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border uppercase ${
                        q.status === "Approved"
                          ? "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/40 font-bold"
                          : q.status === "Revision Requested"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/40"
                      }`}>
                        {q.status}
                      </span>
                      {q.acceptance && (
                        <div className="text-[9px] text-emerald-400 mt-0.5 font-mono">
                          Signed by {q.acceptance.clientSignatureName}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => printProposalPDF(q)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] cursor-pointer"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SUBTAB: ACTIVE PROJECTS (Section 14 & 15) */}
      {subTab === "projects" && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-[#071638] border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Project ID</th>
                  <th className="py-3 px-4">Client &amp; Title</th>
                  <th className="py-3 px-4">Milestone Progress</th>
                  <th className="py-3 px-4">Financials &amp; Balance</th>
                  <th className="py-3 px-4">Project Lifecycle Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projectsList.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#00D9FF]">
                      {p.projectCode}
                      <div className="text-[10px] text-slate-400 font-mono">{p.proposalNumber}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.projectName}</div>
                      <div className="text-slate-300 text-[11px]">{p.clientBusiness} ({p.clientName})</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#087BFF] to-[#00D9FF] h-full"
                            style={{ width: `${p.progressPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-white text-[11px] font-bold">{p.progressPercent}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {p.milestones.filter((m) => m.status === "Approved" || m.status === "Completed").length} of {p.milestones.length} Milestones Approved
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white">{formatINR(p.totalCost)}</div>
                      <div className="text-[10px] text-emerald-400">Paid: {formatINR(p.paidAmount)}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] font-mono text-[10px] border border-[#00D9FF]/30 font-bold uppercase">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. SUBTAB: PACKAGES REFERENCE (W1-W6, A1-A5, C1-C5) */}
      {subTab === "packages" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            {[
              { id: "website", label: "Web Development (W1–W6)" },
              { id: "app", label: "Mobile Apps (A1–A5)" },
              { id: "combo", label: "Web + App Combos (C1–C5)" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDivision(d.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  division === d.id
                    ? "bg-[#00D9FF] text-[#030B24]"
                    : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(division === "website" ? WEBSITE_PACKAGES : division === "app" ? APP_PACKAGES : COMBO_PACKAGES).map((pkg) => (
              <div
                key={pkg.code}
                className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-extrabold text-[#00D9FF]">{pkg.code}</span>
                    <span className="text-[10px] font-mono text-slate-400">{pkg.timeline}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                  <div className="text-xl font-extrabold text-white font-mono">{formatINR(pkg.startingPrice)}</div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{pkg.idealFor}</p>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-slate-300">
                  {pkg.features.slice(0, 4).map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: REQUIREMENT VERIFICATION (17 FIELDS from Section 9) */}
      {isRequirementModalOpen && activeEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold">Requirement Verification Form</span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Scope Engineering Audit: {activeEstimate.estimateNumber}
                </h3>
                <p className="text-slate-400 text-xs">
                  Client: {activeEstimate.clientName} ({activeEstimate.clientBusiness})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRequirementModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">1. Business Objective</label>
                <input
                  type="text"
                  value={reqForm.businessObjective}
                  onChange={(e) => setReqForm({ ...reqForm, businessObjective: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">2. Project Type</label>
                <input
                  type="text"
                  value={reqForm.projectType}
                  onChange={(e) => setReqForm({ ...reqForm, projectType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">3. Target Audience</label>
                <input
                  type="text"
                  value={reqForm.targetAudience}
                  onChange={(e) => setReqForm({ ...reqForm, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">4. Required Screens / Cockpit Views</label>
                <input
                  type="text"
                  value={reqForm.requiredScreens}
                  onChange={(e) => setReqForm({ ...reqForm, requiredScreens: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">5. Required User Roles</label>
                <input
                  type="text"
                  value={reqForm.requiredUserRoles}
                  onChange={(e) => setReqForm({ ...reqForm, requiredUserRoles: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">6. Customer Dashboard Requirements</label>
                <input
                  type="text"
                  value={reqForm.customerDashboardReqs}
                  onChange={(e) => setReqForm({ ...reqForm, customerDashboardReqs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">7. Admin Dashboard Requirements</label>
                <input
                  type="text"
                  value={reqForm.adminDashboardReqs}
                  onChange={(e) => setReqForm({ ...reqForm, adminDashboardReqs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">8. Required Third-Party Integrations</label>
                <input
                  type="text"
                  value={reqForm.requiredIntegrations}
                  onChange={(e) => setReqForm({ ...reqForm, requiredIntegrations: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">9. Payment Gateway Requirements</label>
                <input
                  type="text"
                  value={reqForm.paymentGatewayReqs}
                  onChange={(e) => setReqForm({ ...reqForm, paymentGatewayReqs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">10. Database Requirements</label>
                <input
                  type="text"
                  value={reqForm.databaseReqs}
                  onChange={(e) => setReqForm({ ...reqForm, databaseReqs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">11. Hosting &amp; Domain Requirements</label>
                <input
                  type="text"
                  value={reqForm.hostingRequirements}
                  onChange={(e) => setReqForm({ ...reqForm, hostingRequirements: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">12. Security Requirements</label>
                <input
                  type="text"
                  value={reqForm.securityRequirements}
                  onChange={(e) => setReqForm({ ...reqForm, securityRequirements: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">13. Reference Websites</label>
                <input
                  type="text"
                  value={reqForm.referenceWebsites}
                  onChange={(e) => setReqForm({ ...reqForm, referenceWebsites: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">14. Design Preferences</label>
                <input
                  type="text"
                  value={reqForm.designPreferences}
                  onChange={(e) => setReqForm({ ...reqForm, designPreferences: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">15. Content &amp; Media Availability</label>
                <input
                  type="text"
                  value={reqForm.contentAvailability}
                  onChange={(e) => setReqForm({ ...reqForm, contentAvailability: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">16. Project Delivery Timeline</label>
                <input
                  type="text"
                  value={reqForm.projectTimeline}
                  onChange={(e) => setReqForm({ ...reqForm, projectTimeline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">17. Technical Dependencies &amp; Additional Scope</label>
              <textarea
                rows={3}
                value={reqForm.additionalScope}
                onChange={(e) => setReqForm({ ...reqForm, additionalScope: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsRequirementModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRequirements}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs cursor-pointer shadow-lg hover:brightness-110"
              >
                Save &amp; Lock Verified Specification ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL PROPOSAL GENERATOR (Sections A-Z from Section 10) */}
      {isProposalGeneratorOpen && activeEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold">Proposal Generator Engine</span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Generate Official Proposal for {activeEstimate.clientName}
                </h3>
                <p className="text-slate-400 text-xs">
                  Estimate Snapshot: <strong className="text-white">{activeEstimate.estimateNumber}</strong> (Locked: {formatINR(activeEstimate.grandTotal)})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProposalGeneratorOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Project Title</label>
                <input
                  type="text"
                  value={propForm.projectTitle}
                  onChange={(e) => setPropForm({ ...propForm, projectTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Executive Overview</label>
                <textarea
                  rows={3}
                  value={propForm.projectOverview}
                  onChange={(e) => setPropForm({ ...propForm, projectOverview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Scope of Work &amp; Architecture</label>
                <textarea
                  rows={3}
                  value={propForm.scopeDescription}
                  onChange={(e) => setPropForm({ ...propForm, scopeDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-white text-xs"
                />
              </div>

              {/* Milestone Splits */}
              <div className="p-4 rounded-xl bg-[#071638] border border-white/10 space-y-3">
                <span className="font-bold text-white block uppercase text-[10px] font-mono text-[#00D9FF]">
                  Milestone Payment Schedule Configuration
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Milestone 1 (Advance)</label>
                    <div className="font-mono text-white font-bold">{propForm.advancePercentage}%</div>
                    <div className="text-[10px] text-[#00C98B] font-mono">
                      {formatINR(Math.round(activeEstimate.grandTotal * (propForm.advancePercentage / 100)))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Milestone 2 (Beta UAT)</label>
                    <div className="font-mono text-white font-bold">{propForm.uatPercentage}%</div>
                    <div className="text-[10px] text-[#00C98B] font-mono">
                      {formatINR(Math.round(activeEstimate.grandTotal * (propForm.uatPercentage / 100)))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Milestone 3 (DNS Handover)</label>
                    <div className="font-mono text-white font-bold">{propForm.handoverPercentage}%</div>
                    <div className="text-[10px] text-[#00C98B] font-mono">
                      {formatINR(Math.round(activeEstimate.grandTotal * (propForm.handoverPercentage / 100)))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#071638] border border-white/10 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Total Locked Proposal Investment:</span>
                <span className="font-mono font-extrabold text-[#00D9FF] text-base">
                  {formatINR(activeEstimate.grandTotal)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsProposalGeneratorOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateOfficialProposal}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#E52BFF] text-white font-extrabold text-xs cursor-pointer shadow-lg hover:brightness-110"
              >
                Generate &amp; Dispatch Proposal (v1.0) ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PROJECT ACTIVATION CHECKLIST (Strict Enforcement of 4 Criteria) */}
      {isActivationModalOpen && activeEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00C98B]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-xs">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#00C98B] font-bold">Mandatory Verification Gate</span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Activate Project for {activeEstimate.clientBusiness}
                </h3>
                <p className="text-slate-400 text-xs">
                  Project Activation strictly requires all 4 criteria to be verified.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActivationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 4 Mandatory Criteria Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#071638] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activationChecklist.proposalAccepted}
                  onChange={(e) => setActivationChecklist({ ...activationChecklist, proposalAccepted: e.target.checked })}
                  className="rounded text-[#00C98B] focus:ring-[#00C98B]"
                />
                <div>
                  <span className="font-bold text-white block">1. Proposal Accepted by Client</span>
                  <span className="text-[11px] text-slate-400">Formal scope v1.0 and fixed investment accepted.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#071638] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activationChecklist.agreementExecuted}
                  onChange={(e) => setActivationChecklist({ ...activationChecklist, agreementExecuted: e.target.checked })}
                  className="rounded text-[#00C98B] focus:ring-[#00C98B]"
                />
                <div>
                  <span className="font-bold text-white block">2. Project Agreement / Work Order Executed</span>
                  <span className="text-[11px] text-slate-400">IP assignment and legal terms confirmed.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#071638] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activationChecklist.advancePaymentVerified}
                  onChange={(e) => setActivationChecklist({ ...activationChecklist, advancePaymentVerified: e.target.checked })}
                  className="rounded text-[#00C98B] focus:ring-[#00C98B]"
                />
                <div>
                  <span className="font-bold text-white block">
                    3. Verified Advance Milestone Payment ({formatINR(activationChecklist.advanceAmountPaid)})
                  </span>
                  <span className="text-[11px] text-slate-400">Cleared via Mayank Singh UPI Gateway or verified wire.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#071638] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activationChecklist.adminConfirmation}
                  onChange={(e) => setActivationChecklist({ ...activationChecklist, adminConfirmation: e.target.checked })}
                  className="rounded text-[#00C98B] focus:ring-[#00C98B]"
                />
                <div>
                  <span className="font-bold text-white block">4. Administrator Project Confirmation</span>
                  <span className="text-[11px] text-slate-400">Team assignment and repository creation verified.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsActivationModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmProjectActivation}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00C98B] to-[#00D9FF] text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg hover:brightness-110"
              >
                Confirm Project Kickoff &amp; Create Project ID ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
