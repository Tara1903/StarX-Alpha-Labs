"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardModule } from "./modules/DashboardModule";
import { CRMModule } from "./modules/CRMModule";
import { PersonalizedDemoModule } from "./modules/PersonalizedDemoModule";
import { AgencyEnquiriesModule } from "./modules/AgencyEnquiriesModule";
import { CMSModule } from "./modules/CMSModule";
import { DemoCatalogModule } from "./modules/DemoCatalogModule";
import { VideoStationModule } from "./modules/VideoStationModule";
import { PricingPackagesModule } from "./modules/PricingPackagesModule";
import { BusinessSettingsModule } from "./modules/BusinessSettingsModule";
import { AdminTeamModule } from "./modules/AdminTeamModule";
import { AuditLogsModule } from "./modules/AuditLogsModule";
import { ReportsModule } from "./modules/ReportsModule";
import { FinanceModule } from "./modules/FinanceModule";
import { StarXForgeWorkspace } from "./forge/StarXForgeWorkspace";
import {
  AdminTabId,
  AdminUser,
  UnifiedLead,
  LeadStatus,
  ContactHistoryEntry,
  TechnicalAssessment,
  AdminNotification,
} from "./types";
import { ALL_DEMOS } from "@/data/demos";
import { DemoModel } from "@/types/demo";
import { getQuotations, saveQuotation, Quotation } from "@/lib/quotationStore";
import { getClientProjects, advanceProjectStage, ClientProject, ProjectStage } from "@/lib/projectStore";
import { getEstimates, updateEstimateStatus, CustomerEstimate } from "@/lib/estimateStore";
import { VIDEO_ITEMS, VideoItem } from "@/data/videos";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SuperAdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTabId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Authenticated Admin User
  const [currentUser, setCurrentUser] = useState<AdminUser>({
    id: "usr-root",
    name: "Hari Singh",
    email: "hari.singh@starx-alpha-labs.com",
    role: "owner",
    status: "active",
  });

  // Check Supabase session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser((prev) => ({
            ...prev,
            id: user.id,
            email: user.email || prev.email,
            name: user.user_metadata?.full_name || prev.name,
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    checkAuth();
  }, []);

  // 1. Data States
  const [demosList, setDemosList] = useState<DemoModel[]>(ALL_DEMOS);
  const [videoList, setVideoList] = useState<VideoItem[]>(VIDEO_ITEMS);
  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    typeof window !== "undefined" ? getQuotations() : []
  );
  const [projects, setProjects] = useState<ClientProject[]>(() =>
    typeof window !== "undefined" ? getClientProjects() : []
  );
  const [estimates, setEstimates] = useState<CustomerEstimate[]>(() =>
    typeof window !== "undefined" ? getEstimates() : []
  );

  // Demo Requests
  const [demoRequests, setDemoRequests] = useState<any[]>([]);

  // Agency Enquiries
  const [agencyEnquiries, setAgencyEnquiries] = useState<any[]>([]);

  // Unified Leads Aggregation
  const [unifiedLeads, setUnifiedLeads] = useState<UnifiedLead[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "notif-1",
      title: "System Online",
      description: "Admin Operations Centre initialized with active Supabase connectivity.",
      timestamp: "Just now",
      type: "system",
      read: false,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper mapper to transform quote_requests and inquiries into UnifiedLead
  const mapRecordToUnifiedLead = useCallback((q: any, source: UnifiedLead["source"] = "quote"): UnifiedLead => {
    const meta = q.metadata || {};
    const proj = meta.project || {};
    const art = meta.artifact || {};
    const job = meta.job || {};
    const contact = meta.contactProfile || {};

    const code = meta.enquiryRef || `STX-ENQ-${(q.id || "").slice(0, 6).toUpperCase()}`;

    return {
      id: q.id,
      code,
      enquiryRef: meta.enquiryRef || code,
      source: meta.is_design_studio || meta.projectId ? "quote" : source,
      fullName: q.name || contact.fullName || "Valued Client",
      businessName: q.company || proj.title || "",
      email: q.email || contact.email || "",
      phone: q.phone || contact.phone || "",
      city: contact.location || q.city || "",
      country: q.country || "India",
      industry: proj.industrySlug || q.service_slug || "",
      serviceRequired: q.service_slug || proj.divisionSlug || "Digital Transformation",
      budgetRange: q.budget_range || "",
      timeline: q.timeline || "",
      primaryGoal: q.project_details || proj.rawDescription || "",
      message: q.project_details || q.message || "",
      status: (q.status as LeadStatus) || "new",
      assignedTo: meta.assignedTo || undefined,
      followUpDate: meta.followUpDate || undefined,
      internalNotes: Array.isArray(meta.internalNotes) ? meta.internalNotes : [],
      contactHistory: Array.isArray(meta.contactHistory) ? meta.contactHistory : [],
      technicalAssessment: meta.technicalAssessment || undefined,
      lostReason: meta.lostReason || undefined,
      contactProfile: {
        preferredMethod: contact.preferredMethod || "phone",
        bestTimeToReach: contact.bestTimeToReach || "",
        countryCode: contact.countryCode || "+91",
        location: contact.location || "",
        companyName: q.company || "",
      },
      designDetails:
        art.id || proj.id
          ? {
              artifactId: art.id || meta.artifactId,
              projectId: proj.id || meta.projectId,
              projectCode: proj.projectCode,
              title: art.title || proj.title,
              versionNumber: art.versionNumber || 1,
              provider: art.provider || "stitch",
              styleName: art.styleName,
              deviceType: art.deviceType,
              thumbnailUrl: art.thumbnailUrl,
              downloadUrl: art.downloadUrl,
              storagePathHtml: art.storagePathHtml,
              storagePathScreenshot: art.storagePathScreenshot,
              keyFeatures: art.keyFeatures || [],
              palette: art.palette || [],
              designMd: art.designMd,
              htmlCode: art.htmlCode,
              prompt: job.prompt || art.prompt,
              isApproved: art.isApproved ?? true,
            }
          : undefined,
      createdAt: q.created_at ? new Date(q.created_at).toLocaleString() : new Date().toLocaleString(),
      lastActivityAt: q.updated_at ? new Date(q.updated_at).toLocaleString() : new Date().toLocaleString(),
      rawMetadata: meta,
    };
  }, []);

  // Fetch inquiries from authoritative backend
  const fetchInquiries = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/admin/inquiries?type=all");
      if (!res.ok) {
        // Unauthenticated or server error
        return;
      }
      const data = await res.json();
      if (data.success) {
        const mappedQuotes: UnifiedLead[] = (data.quotes || []).map((q: any) =>
          mapRecordToUnifiedLead(q, "quote")
        );
        const mappedEnquiries: UnifiedLead[] = (data.enquiries || []).map((e: any) =>
          mapRecordToUnifiedLead(e, "contact")
        );
        const mappedCustEnq: UnifiedLead[] = (data.customerEnquiries || []).map((c: any) =>
          mapRecordToUnifiedLead(c, "quote")
        );

        const allMapped = [...mappedQuotes, ...mappedEnquiries, ...mappedCustEnq];
        if (allMapped.length > 0) {
          setUnifiedLeads(allMapped);

          // Split into demo requests if appropriate
          const demos = allMapped.filter((l) => l.designDetails);
          setDemoRequests(demos);
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsRefreshing(false);
    }
  }, [mapRecordToUnifiedLead]);

  // Initial fetch and 30-second polling interval
  useEffect(() => {
    fetchInquiries();
    const interval = setInterval(fetchInquiries, 30000);
    return () => clearInterval(interval);
  }, [fetchInquiries]);

  // Handlers for Lead Updates with Supabase Persistence
  const handleUpdateLeadStatus = async (leadId: string, status: LeadStatus, lostReason?: string) => {
    // 1. Optimistic update
    setUnifiedLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status,
              lostReason: lostReason || l.lostReason,
              lastActivityAt: new Date().toLocaleTimeString(),
            }
          : l
      )
    );

    // 2. Persist to Supabase
    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          status,
          lostReason,
        }),
      });
    } catch (err) {
      console.error("[STATUS UPDATE ERROR]", err);
    }
  };

  const handleAddInternalNote = async (leadId: string, noteText: string) => {
    const noteObj = {
      id: `note-${Date.now()}`,
      author: currentUser.email || currentUser.name,
      text: noteText,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // 1. Optimistic update
    setUnifiedLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              internalNotes: [noteObj, ...l.internalNotes],
              lastActivityAt: noteObj.createdAt,
            }
          : l
      )
    );

    // 2. Persist to Supabase
    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          notes: noteText,
        }),
      });
    } catch (err) {
      console.error("[NOTE LOG ERROR]", err);
    }
  };

  const handleUpdateFollowUp = async (leadId: string, date: string) => {
    setUnifiedLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, followUpDate: date } : l))
    );

    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          followUpDate: date,
        }),
      });
    } catch (err) {
      console.error("[FOLLOWUP UPDATE ERROR]", err);
    }
  };

  const handleAssignLead = async (leadId: string, assignee: string) => {
    setUnifiedLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedTo: assignee } : l))
    );

    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          assignedTo: assignee,
        }),
      });
    } catch (err) {
      console.error("[ASSIGN LEAD ERROR]", err);
    }
  };

  const handleRecordContactOutcome = async (
    leadId: string,
    outcome: {
      method: "phone" | "whatsapp" | "email" | "in_person";
      outcome: ContactHistoryEntry["outcome"];
      notes: string;
      nextFollowUpDate?: string;
    }
  ) => {
    const historyEntry: ContactHistoryEntry = {
      id: `ct-${Date.now()}`,
      date: new Date().toISOString(),
      method: outcome.method,
      outcome: outcome.outcome,
      notes: outcome.notes,
      staffName: currentUser.email || currentUser.name,
      nextFollowUpDate: outcome.nextFollowUpDate,
    };

    // Determine target lead status based on outcome
    let nextStatus: LeadStatus = "contacted";
    if (outcome.outcome === "no_answer_voicemail" || outcome.outcome === "whatsapp_sent_waiting") {
      nextStatus = "attempted_contact";
    } else if (outcome.outcome === "client_not_interested") {
      nextStatus = "not_interested";
    } else if (outcome.outcome === "client_unresponsive") {
      nextStatus = "on_hold";
    }

    setUnifiedLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: nextStatus,
              followUpDate: outcome.nextFollowUpDate || l.followUpDate,
              contactHistory: [historyEntry, ...(l.contactHistory || [])],
              lastActivityAt: new Date().toLocaleTimeString(),
            }
          : l
      )
    );

    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          status: nextStatus,
          contactOutcome: outcome,
          followUpDate: outcome.nextFollowUpDate,
        }),
      });
    } catch (err) {
      console.error("[CONTACT OUTCOME ERROR]", err);
    }
  };

  const handleSaveTechnicalAssessment = async (
    leadId: string,
    assessment: TechnicalAssessment
  ) => {
    setUnifiedLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: "assessment_complete",
              technicalAssessment: assessment,
              lastActivityAt: new Date().toLocaleTimeString(),
            }
          : l
      )
    );

    try {
      await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "quote_requests",
          id: leadId,
          status: "assessment_complete",
          technicalAssessment: assessment,
        }),
      });
    } catch (err) {
      console.error("[TECHNICAL ASSESSMENT ERROR]", err);
    }
  };

  const handleConvertEstimate = (est: CustomerEstimate) => {
    saveQuotation({
      clientName: est.clientName,
      clientBusiness: est.clientBusiness,
      clientEmail: est.clientEmail,
      clientPhone: est.clientPhone,
      selectedSolution: `${est.packageCode} — ${est.packageName}`,
      projectScope: `Scope built via Interactive Project Calculator for ${est.division.toUpperCase()} division. Deliverables include base package and ${est.selectedAddons.length} power-up modules.`,
      modules: est.selectedAddons.map((a) => a.name),
      features: [
        "Source Code Ownership",
        "Staging Environment Approvals",
        "30-Day Technical Warranty",
      ],
      items: [
        {
          id: "i1",
          category: "Development",
          title: `Base Package: ${est.packageCode}`,
          description: est.packageName,
          amount: est.basePrice,
        },
        {
          id: "i2",
          category: "Integrations & APIs",
          title: `Add-on Modules (${est.selectedAddons.length})`,
          description: est.selectedAddons.map((a) => a.name).join(", "),
          amount: est.addonsTotal,
        },
        {
          id: "i3",
          category: "Hosting & Cloud",
          title: "Cloud Infrastructure Setup",
          description: "Configured managed environment",
          amount: est.hostingCost,
        },
        {
          id: "i4",
          category: "Maintenance & SLA",
          title: "Hypercare & Maintenance SLA",
          description: "First period post-launch coverage",
          amount: est.maintenanceCost,
        },
      ],
      subtotal: est.subtotal,
      taxRate: 0.18,
      taxAmount: est.gstAmount,
      totalAmount: est.grandTotal,
      paymentSchedule:
        "50% Advance on Kickoff, 30% on Staging Approval, 20% on Live Handover",
      deliveryTimeline: "10–21 Days",
      termsAndConditions: [
        "Deliverables verified in client staging before production deployment.",
        "Includes source code ownership and technical handover documentation.",
      ],
    });

    updateEstimateStatus(est.id, "Quotation Issued");
    setQuotations(getQuotations());
    setEstimates(getEstimates());
    setActiveTab("quotations");
    showToast(`Converted Estimate ${est.estimateNumber} into Quotation!`);
  };

  const handleAdvanceProjectStage = (
    projectId: string,
    newStage: ProjectStage
  ) => {
    advanceProjectStage(projectId, newStage);
    setProjects(getClientProjects());
    showToast(`Advanced project stage to ${newStage}`);
  };

  const handleSaveDemo = (demo: DemoModel) => {
    setDemosList((prev) => prev.map((d) => (d.id === demo.id ? demo : d)));
  };

  const handleSaveVideo = (video: VideoItem) => {
    setVideoList((prev) => {
      const idx = prev.findIndex((v) => v.id === video.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = video;
        return copy;
      }
      return [video, ...prev];
    });
  };

  const handleDeleteVideo = (id: string) => {
    setVideoList((prev) => prev.filter((v) => v.id !== id));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleSignOut = () => {
    if (confirm("Sign out of StarX Alpha Labs Super Admin Portal?")) {
      window.location.href = "/admin/login";
    }
  };

  // Sidebar badge counts
  const sidebarCounts = {
    leads: unifiedLeads.length,
    demoRequests: demoRequests.length,
    agencyEnquiries: agencyEnquiries.length,
    estimates: estimates.length,
    quotations: quotations.length,
    projects: projects.length,
    demos: demosList.length,
    videos: videoList.length,
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-white flex flex-col lg:flex-row antialiased selection:bg-[#087BFF] selection:text-white">
      {/* 1. Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        counts={sidebarCounts}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-[#00C98B]/95 text-[#030B24] font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Global Header */}
        <AdminHeader
          activeTab={activeTab}
          currentUser={currentUser}
          onOpenMobile={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAction={(action) => {
            if (action === "quote") setActiveTab("quotations");
            else if (action === "demo") setActiveTab("demos");
            else if (action === "video") setActiveTab("video-station");
            else if (action === "lead") setActiveTab("crm");
          }}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onSignOut={handleSignOut}
        />

        {/* Workspace Body */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <DashboardModule
              onNavigate={setActiveTab}
              leads={unifiedLeads}
              demoRequests={demoRequests}
              estimates={estimates}
              quotations={quotations}
              projects={projects}
              demos={demosList}
              videos={videoList}
            />
          )}

          {activeTab === "crm" && (
            <CRMModule
              leads={unifiedLeads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onAddInternalNote={handleAddInternalNote}
              onUpdateFollowUp={handleUpdateFollowUp}
              onAssignLead={handleAssignLead}
              onRecordContactOutcome={handleRecordContactOutcome}
              onSaveTechnicalAssessment={handleSaveTechnicalAssessment}
              onShowToast={showToast}
            />
          )}

          {activeTab === "demo-requests" && (
            <PersonalizedDemoModule
              requests={demoRequests}
              onUpdateStatus={(id, st) => {
                setDemoRequests((prev) =>
                  prev.map((r) => (r.id === id ? { ...r, status: st } : r))
                );
              }}
              onShowToast={showToast}
            />
          )}

          {activeTab === "agency-enquiries" && (
            <AgencyEnquiriesModule
              enquiries={agencyEnquiries}
              onUpdateStatus={(id, st) => {
                setAgencyEnquiries((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, status: st } : e))
                );
              }}
              onShowToast={showToast}
            />
          )}

          {activeTab === "estimates" && (
            <PricingPackagesModule
              estimates={estimates}
              quotations={quotations}
              projects={projects}
              initialSubTab="estimates"
              onConvertEstimate={handleConvertEstimate}
              onAdvanceProjectStage={handleAdvanceProjectStage}
              onShowToast={showToast}
            />
          )}

          {activeTab === "quotations" && (
            <PricingPackagesModule
              estimates={estimates}
              quotations={quotations}
              projects={projects}
              initialSubTab="quotations"
              onConvertEstimate={handleConvertEstimate}
              onAdvanceProjectStage={handleAdvanceProjectStage}
              onShowToast={showToast}
            />
          )}

          {activeTab === "projects" && (
            <PricingPackagesModule
              estimates={estimates}
              quotations={quotations}
              projects={projects}
              initialSubTab="projects"
              onConvertEstimate={handleConvertEstimate}
              onAdvanceProjectStage={handleAdvanceProjectStage}
              onShowToast={showToast}
            />
          )}

          {activeTab === "forge" && (
            <StarXForgeWorkspace onShowToast={showToast} />
          )}

          {activeTab === "demos" && (
            <DemoCatalogModule
              demos={demosList}
              onSaveDemo={handleSaveDemo}
              onShowToast={showToast}
            />
          )}

          {activeTab === "video-station" && (
            <VideoStationModule
              videos={videoList}
              onSaveVideo={handleSaveVideo}
              onDeleteVideo={handleDeleteVideo}
              onShowToast={showToast}
            />
          )}

          {(activeTab === "cms-services" ||
            activeTab === "cms-divisions" ||
            activeTab === "cms-industries" ||
            activeTab === "cms-portfolio" ||
            activeTab === "cms-blog") && (
            <CMSModule
              initialSubTab={activeTab.replace("cms-", "") as any}
              onShowToast={showToast}
            />
          )}

          {activeTab === "pricing-packages" && (
            <PricingPackagesModule
              estimates={estimates}
              quotations={quotations}
              projects={projects}
              initialSubTab="packages"
              onConvertEstimate={handleConvertEstimate}
              onAdvanceProjectStage={handleAdvanceProjectStage}
              onShowToast={showToast}
            />
          )}

          {activeTab === "settings" && (
            <BusinessSettingsModule onShowToast={showToast} />
          )}

          {activeTab === "team" && (
            <AdminTeamModule currentUser={currentUser} onShowToast={showToast} />
          )}

          {activeTab === "audit-logs" && (
            <AuditLogsModule onShowToast={showToast} />
          )}

          {activeTab === "reports" && (
            <ReportsModule
              leads={unifiedLeads}
              estimates={estimates}
              quotations={quotations}
              demos={demosList}
              onShowToast={showToast}
            />
          )}

          {(activeTab === "finance" ||
            activeTab === "contracts" ||
            activeTab === "invoices" ||
            activeTab === "payments" ||
            activeTab === "expenses") && (
            <FinanceModule
              defaultSubTab={activeTab === "finance" ? "overview" : activeTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
