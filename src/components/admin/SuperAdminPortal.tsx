"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { AdminTabId, AdminUser, UnifiedLead, AdminNotification } from "./types";
import { ALL_DEMOS } from "@/data/demos";
import { DemoModel } from "@/types/demo";
import { getEnquiries, updateEnquiryStatus, DemoEnquiry } from "@/lib/leadStore";
import { getQuotations, saveQuotation, Quotation } from "@/lib/quotationStore";
import { getClientProjects, advanceProjectStage, ClientProject, ProjectStage } from "@/lib/projectStore";
import { getEstimates, updateEstimateStatus, CustomerEstimate } from "@/lib/estimateStore";
import { VIDEO_ITEMS, VideoItem } from "@/data/videos";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SuperAdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTabId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        const { data: { user } } = await supabase.auth.getUser();
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
  const [demoRequests, setDemoRequests] = useState<any[]>([
    {
      id: "req-1",
      requestCode: "DEMO-73921",
      fullName: "Vikram Malhotra",
      businessName: "Malhotra Ortho & Dental Care",
      phone: "+91 98260 12345",
      email: "vikram@malhotracare.com",
      city: "Indore",
      industry: "Medical & Dental Clinics",
      solutionType: "Website + App Combo",
      primaryGoal: "Accept Online Appointments & Digital Intake",
      estimatedBudget: "₹50,000 – ₹1,00,000",
      targetTimeline: "Immediately (1-2 Weeks)",
      status: "pending",
      createdAt: "2026-11-11T09:30:00Z",
    },
    {
      id: "req-2",
      requestCode: "DEMO-84192",
      fullName: "Ananya Deshmukh",
      businessName: "Spice Symphony Bistro",
      phone: "+91 97555 88990",
      email: "ananya@spicesymphony.in",
      city: "Bhopal",
      industry: "Restaurants & Cafes",
      solutionType: "Professional Business Website",
      primaryGoal: "Commission-Free Food Ordering & Table QR",
      estimatedBudget: "₹25,000 – ₹50,000",
      targetTimeline: "Within 1 Month",
      status: "in_review",
      createdAt: "2026-11-10T14:15:00Z",
    },
  ]);

  // Agency Enquiries
  const [agencyEnquiries, setAgencyEnquiries] = useState<any[]>([
    {
      id: "agy-1",
      code: "AGY-9104",
      agencyName: "Vortex Digital Agency",
      website: "https://vortexdigital.in",
      contactPerson: "Rahul Sharma",
      email: "rahul@vortexdigital.in",
      phone: "+91 98111 22334",
      country: "India",
      monthlyProjects: "3-5",
      primaryServices: "Full-Stack Web Development, Next.js E-Commerce, Supabase Systems",
      partnershipTier: "Growth Partner",
      message: "Looking for guaranteed 14-day turnaround on high-end B2B client sites with 50% margins.",
      status: "new",
      createdAt: "2026-11-11 11:20:00",
    },
  ]);

  // Unified Leads Aggregation
  const [unifiedLeads, setUnifiedLeads] = useState<UnifiedLead[]>([
    {
      id: "lead-d1",
      code: "DEMO-73921",
      source: "demo-request",
      fullName: "Vikram Malhotra",
      businessName: "Malhotra Ortho & Dental Care",
      email: "vikram@malhotracare.com",
      phone: "+91 98260 12345",
      city: "Indore",
      country: "India",
      industry: "Medical & Dental Clinics",
      serviceRequired: "Website + App Combo",
      budgetRange: "₹50,000 – ₹1,00,000",
      timeline: "Immediately (1-2 Weeks)",
      primaryGoal: "Accept Online Appointments & Digital Intake",
      status: "under_review",
      internalNotes: [
        {
          id: "n1",
          author: "Hari Singh",
          text: "Verified clinic requirement. Sent demo model #34 preview link over WhatsApp.",
          createdAt: "2026-11-11 10:15",
        },
      ],
      createdAt: "2026-11-11 09:30",
      lastActivityAt: "2026-11-11 10:15",
    },
    {
      id: "lead-d2",
      code: "DEMO-84192",
      source: "demo-request",
      fullName: "Ananya Deshmukh",
      businessName: "Spice Symphony Bistro",
      email: "ananya@spicesymphony.in",
      phone: "+91 97555 88990",
      city: "Bhopal",
      country: "India",
      industry: "Restaurants & Cafes",
      serviceRequired: "Professional Business Website",
      budgetRange: "₹25,000 – ₹50,000",
      timeline: "Within 1 Month",
      primaryGoal: "Commission-Free Food Ordering & Table QR",
      status: "new",
      internalNotes: [],
      createdAt: "2026-11-10 14:15",
      lastActivityAt: "2026-11-10 14:15",
    },
    {
      id: "lead-a1",
      code: "AGY-9104",
      source: "agency",
      fullName: "Rahul Sharma",
      businessName: "Vortex Digital Agency",
      email: "rahul@vortexdigital.in",
      phone: "+91 98111 22334",
      country: "India",
      serviceRequired: "White-Label Partner",
      agencyTier: "Growth Partner",
      projectVolume: "3-5 projects/mo",
      status: "new",
      internalNotes: [],
      createdAt: "2026-11-11 11:20",
      lastActivityAt: "2026-11-11 11:20",
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "notif-1",
      title: "New Demo Request",
      description: "Vikram Malhotra requested personalized demo for Dental Clinic.",
      timestamp: "10 mins ago",
      type: "demo",
      read: false,
    },
    {
      id: "notif-2",
      title: "Agency Application",
      description: "Vortex Digital Agency applied for Growth Partner tier.",
      timestamp: "1 hour ago",
      type: "lead",
      read: false,
    },
    {
      id: "notif-3",
      title: "Security Hardened",
      description: "Phase 7 strict HSTS and CSP headers active on Vercel.",
      timestamp: "2 hours ago",
      type: "system",
      read: true,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers
  const handleUpdateLeadStatus = (leadId: string, status: UnifiedLead["status"]) => {
    setUnifiedLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, lastActivityAt: new Date().toLocaleTimeString() } : l))
    );
  };

  const handleAddInternalNote = (leadId: string, noteText: string) => {
    const noteObj = {
      id: `note-${Date.now()}`,
      author: currentUser.name,
      text: noteText,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

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
      features: ["Source Code Ownership", "Staging Environment Approvals", "30-Day Technical Warranty"],
      items: [
        { id: "i1", category: "Development", title: `Base Package: ${est.packageCode}`, description: est.packageName, amount: est.basePrice },
        { id: "i2", category: "Integrations & APIs", title: `Add-on Modules (${est.selectedAddons.length})`, description: est.selectedAddons.map((a) => a.name).join(", "), amount: est.addonsTotal },
        { id: "i3", category: "Hosting & Cloud", title: "Cloud Infrastructure Setup", description: "Configured managed environment", amount: est.hostingCost },
        { id: "i4", category: "Maintenance & SLA", title: "Hypercare & Maintenance SLA", description: "First period post-launch coverage", amount: est.maintenanceCost },
      ],
      subtotal: est.subtotal,
      taxRate: 0.18,
      taxAmount: est.gstAmount,
      totalAmount: est.grandTotal,
      paymentSchedule: "50% Advance on Kickoff, 30% on Staging Approval, 20% on Live Handover",
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

  const handleAdvanceProjectStage = (projectId: string, newStage: ProjectStage) => {
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
              onUpdateFollowUp={() => {}}
              onAssignLead={() => {}}
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

          {activeTab.startsWith("cms-") && (
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

          {activeTab === "finance" && (
            <FinanceModule defaultSubTab="overview" />
          )}

          {activeTab === "contracts" && (
            <FinanceModule defaultSubTab="contracts" />
          )}

          {activeTab === "invoices" && (
            <FinanceModule defaultSubTab="invoices" />
          )}

          {activeTab === "payments" && (
            <FinanceModule defaultSubTab="payments" />
          )}

          {activeTab === "expenses" && (
            <FinanceModule defaultSubTab="expenses" />
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
        </main>
      </div>
    </div>
  );
}
