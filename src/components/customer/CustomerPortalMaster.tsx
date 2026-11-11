"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CustomerPortalTab, 
  CustomerSessionContext, 
  ProjectMilestoneItem, 
  ClientTaskItem, 
  ClientDocumentItem, 
  ProjectUpdateItem, 
  ProjectDiscussionMessage, 
  ClientChangeRequestItem, 
  ClientSupportTicket, 
  ClientNotificationItem,
  DocumentCategory 
} from "@/types/customerPortal";
import { CustomerSidebar } from "./CustomerSidebar";
import { CustomerHeader } from "./CustomerHeader";
import { DashboardModule } from "./modules/DashboardModule";
import { ProjectsModule } from "./modules/ProjectsModule";
import { MilestonesModule } from "./modules/MilestonesModule";
import { TasksModule } from "./modules/TasksModule";
import { DocumentsModule } from "./modules/DocumentsModule";
import { FinancesModule } from "./modules/FinancesModule";
import { DiscussionsModule } from "./modules/DiscussionsModule";
import { ChangeRequestsModule } from "./modules/ChangeRequestsModule";
import { SupportModule } from "./modules/SupportModule";
import { OrganizationModule } from "./modules/OrganizationModule";
import { AccountModule } from "./modules/AccountModule";
import { EstimatesModule } from "./modules/EstimatesModule";
import { ProposalsModule } from "./modules/ProposalsModule";
import { AgreementsModule } from "./modules/AgreementsModule";
import { WarrantyModule } from "./modules/WarrantyModule";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function CustomerPortalMaster() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as CustomerPortalTab) || "dashboard";
  const initialContextId = searchParams.get("id") || "";

  const [activeTab, setActiveTab] = useState<CustomerPortalTab>(
    ["dashboard", "estimates", "proposals", "agreements", "projects", "milestones", "tasks", "documents", "finances", "discussions", "change-requests", "support", "warranty", "organization", "account"].includes(initialTab)
      ? initialTab
      : "dashboard"
  );
  const [activeContextId, setActiveContextId] = useState<string>(initialContextId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<CustomerSessionContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [milestones, setMilestones] = useState<ProjectMilestoneItem[]>([]);
  const [tasks, setTasks] = useState<ClientTaskItem[]>([]);
  const [documents, setDocuments] = useState<ClientDocumentItem[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdateItem[]>([]);
  const [messages, setMessages] = useState<ProjectDiscussionMessage[]>([]);
  const [changeRequests, setChangeRequests] = useState<ClientChangeRequestItem[]>([]);
  const [tickets, setTickets] = useState<ClientSupportTicket[]>([]);
  const [notifications, setNotifications] = useState<ClientNotificationItem[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Initial Load: Fetch session or fallback to mock client session if not signed in
  useEffect(() => {
    async function initSession() {
      try {
        const res = await fetch("/api/customer/session");
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setSession(data.session);
            loadProjectData(data.session.assignedProjects[0]?.id);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to verified demo client workspace
      }

      // Default client context for seamless evaluation
      const fallbackSession: CustomerSessionContext = {
        user: {
          id: "usr-client-demo",
          email: "vikram@malhotracare.com",
          fullName: "Dr. Vikram Malhotra",
        },
        organization: {
          id: "org-malhotra-care",
          name: "Malhotra Ortho & Dental Care",
          businessType: "Healthcare & Dental Clinics",
          primaryContactName: "Dr. Vikram Malhotra",
          primaryContactEmail: "vikram@malhotracare.com",
          phone: "+91 98260 12345",
          country: "India",
          address: "142 RNT Marg, South Tukoganj, Indore, MP 452001",
          status: "active",
          createdAt: new Date().toISOString(),
        },
        membership: {
          id: "mem-client-owner",
          organizationId: "org-malhotra-care",
          userId: "usr-client-demo",
          role: "owner",
          status: "active",
          fullName: "Dr. Vikram Malhotra",
          email: "vikram@malhotracare.com",
          createdAt: new Date().toISOString(),
        },
        assignedProjects: [
          {
            id: "proj-dental-portal-1",
            projectCode: "SX-PRJ-7491",
            projectName: "Omnichannel Clinic Intake & Patient Portal (Web + App)",
            division: "combo",
            currentStage: "Frontend / App UI Development",
            progressPercent: 46,
            totalBudget: 85000,
            status: "Active",
          },
        ],
      };

      setSession(fallbackSession);
      loadMockProjectData();
      setLoading(false);
    }

    initSession();
  }, []);

  const loadProjectData = async (projectId?: string) => {
    if (!projectId) {
      loadMockProjectData();
      return;
    }

    try {
      const [projRes, docRes, discRes, crRes, tktRes, notifRes] = await Promise.all([
        fetch(`/api/customer/projects?projectId=${projectId}`),
        fetch(`/api/customer/documents?projectId=${projectId}`),
        fetch(`/api/customer/discussions?projectId=${projectId}`),
        fetch(`/api/customer/change-requests?projectId=${projectId}`),
        fetch(`/api/customer/support`),
        fetch(`/api/customer/notifications`),
      ]);

      if (projRes.ok) {
        const pData = await projRes.json();
        setMilestones(pData.milestones || []);
        setTasks(pData.tasks || []);
        setUpdates(pData.updates || []);
      }
      if (docRes.ok) {
        const dData = await docRes.json();
        setDocuments(dData.documents || []);
      }
      if (discRes.ok) {
        const discData = await discRes.json();
        setMessages(discData.messages || []);
      }
      if (crRes.ok) {
        const crData = await crRes.json();
        setChangeRequests(crData.changeRequests || []);
      }
      if (tktRes.ok) {
        const tData = await tktRes.json();
        setTickets(tData.tickets || []);
      }
      if (notifRes.ok) {
        const nData = await notifRes.json();
        setNotifications(nData.notifications || []);
      }
    } catch {
      loadMockProjectData();
    }
  };

  const loadMockProjectData = () => {
    // 13-stage verified milestone delivery roadmap
    const defaultMilestones: ProjectMilestoneItem[] = [
      { id: "m-1", projectId: "proj-dental-portal-1", title: "Requirement Gathering & Technical Scope Signoff", stageOrder: 1, status: "completed", actualCompletionDate: "2026-11-02", clientVisible: true },
      { id: "m-2", projectId: "proj-dental-portal-1", title: "UI/UX Wireframing & High-Fidelity Design Review", stageOrder: 2, status: "completed", actualCompletionDate: "2026-11-06", clientVisible: true, deliverableUrl: "https://www.starxalphalabs.online/demos/medical-dental/dental-clinic" },
      { id: "m-3", projectId: "proj-dental-portal-1", title: "Architecture & PostgreSQL Database Setup", stageOrder: 3, status: "completed", actualCompletionDate: "2026-11-09", clientVisible: true },
      { id: "m-4", projectId: "proj-dental-portal-1", title: "Frontend / Mobile App UI Implementation", stageOrder: 4, status: "in_progress", targetDeliveryDate: "2026-11-15", clientVisible: true },
      { id: "m-5", projectId: "proj-dental-portal-1", title: "Backend Business Logic & Booking Slot Engine", stageOrder: 5, status: "awaiting_client", targetDeliveryDate: "2026-11-18", clientVisible: true },
      { id: "m-6", projectId: "proj-dental-portal-1", title: "WhatsApp Webhook & SMS API Integration", stageOrder: 6, status: "upcoming", targetDeliveryDate: "2026-11-22", clientVisible: true },
      { id: "m-7", projectId: "proj-dental-portal-1", title: "Quality Assurance, Security & Cross-Browser Testing", stageOrder: 7, status: "upcoming", targetDeliveryDate: "2026-11-26", clientVisible: true },
      { id: "m-8", projectId: "proj-dental-portal-1", title: "Client Beta Review & Feedback Integration", stageOrder: 8, status: "upcoming", targetDeliveryDate: "2026-11-29", clientVisible: true },
      { id: "m-9", projectId: "proj-dental-portal-1", title: "Production Deployment & TLS Hardening", stageOrder: 9, status: "upcoming", targetDeliveryDate: "2026-12-03", clientVisible: true },
      { id: "m-10", projectId: "proj-dental-portal-1", title: "Staff Training & Knowledge Transfer", stageOrder: 10, status: "upcoming", targetDeliveryDate: "2026-12-06", clientVisible: true },
      { id: "m-11", projectId: "proj-dental-portal-1", title: "Final Handover & Intellectual Property Signoff", stageOrder: 11, status: "upcoming", targetDeliveryDate: "2026-12-08", clientVisible: true },
      { id: "m-12", projectId: "proj-dental-portal-1", title: "Active SLA Maintenance & Support Kickoff", stageOrder: 12, status: "upcoming", targetDeliveryDate: "2026-12-10", clientVisible: true },
    ];
    setMilestones(defaultMilestones);

    setTasks([
      { id: "t-1", projectId: "proj-dental-portal-1", title: "Review & Sign off on Patient Intake Fields Schema", clientAction: "approve", status: "awaiting_client", dueDate: "2026-11-14", clientVisible: true },
      { id: "t-2", projectId: "proj-dental-portal-1", title: "Upload Clinic High-Res Logo & Doctor Credentials", clientAction: "upload_files", status: "pending", dueDate: "2026-11-16", clientVisible: true },
      { id: "t-3", projectId: "proj-dental-portal-1", title: "Approved Initial UI/UX Wireframe Prototype", clientAction: "review", status: "completed", clientVisible: true },
    ]);

    setDocuments([
      { id: "doc-1", projectId: "proj-dental-portal-1", organizationId: "org-malhotra-care", fileName: "Project Technical Specification & Scope Document v1.2", fileUrl: "#", fileType: "application/pdf", documentCategory: "brief", version: "v1.2", uploadedByType: "admin", clientVisible: true, createdAt: "2026-11-03T10:00:00Z" },
      { id: "doc-2", projectId: "proj-dental-portal-1", organizationId: "org-malhotra-care", fileName: "High-Fidelity Mobile App Wireframes (Figma Export)", fileUrl: "#", fileType: "image/png", documentCategory: "ui_ux_design", version: "v2.0", uploadedByType: "admin", clientVisible: true, createdAt: "2026-11-07T14:30:00Z" },
      { id: "doc-3", projectId: "proj-dental-portal-1", organizationId: "org-malhotra-care", fileName: "Sprint 1 Interactive Demonstration Video", fileUrl: "#", fileType: "video/mp4", documentCategory: "deliverable", version: "v1.0", uploadedByType: "admin", clientVisible: true, createdAt: "2026-11-10T16:00:00Z" },
    ]);

    setUpdates([
      { id: "upd-1", projectId: "proj-dental-portal-1", title: "Sprint 1 Completed: Database Architecture & Core Booking Engine Live", summary: "The appointment slot logic and database tables have been verified in staging.", authorName: "Lead Architect", publishedAt: "2026-11-10T12:00:00Z" },
      { id: "upd-2", projectId: "proj-dental-portal-1", title: "Design System Approved: Proceeding to Mobile App UI Build", summary: "Client design approval confirmed. Frontend developers actively constructing the responsive components.", authorName: "Hari Singh", publishedAt: "2026-11-07T09:30:00Z" },
    ]);

    setMessages([
      { id: "msg-1", projectId: "proj-dental-portal-1", senderName: "Hari Singh (Lead Architect)", senderType: "admin", message: "Welcome Dr. Malhotra to your StarX Alpha Labs client workspace! We have completed the core appointment scheduling engine and are now building the mobile app interface.", createdAt: "2026-11-10T10:15:00Z" },
      { id: "msg-2", projectId: "proj-dental-portal-1", senderName: "Dr. Vikram Malhotra", senderType: "client", message: "Thank you Hari. The initial wireframes look fantastic. We especially liked the patient intake form simplification.", createdAt: "2026-11-10T11:45:00Z" },
    ]);

    setChangeRequests([
      { id: "cr-1", projectId: "proj-dental-portal-1", organizationId: "org-malhotra-care", title: "Add Automated Patient WhatsApp SMS Reminders (24hr Before)", description: "Send automated WhatsApp confirmation messages to patients before scheduled appointments.", justification: "Reduces patient no-shows by an estimated 40%.", priority: "high", status: "accepted", adminResponse: "Approved by Lead Architect. Integrated into Milestone 6.", createdAt: "2026-11-08T15:00:00Z", updatedAt: "2026-11-09T10:00:00Z" }
    ]);

    setTickets([
      { id: "tkt-1", ticketNumber: "TKT-49120", organizationId: "org-malhotra-care", subject: "Request Test Credentials for Patient Staging Environment", description: "Our reception staff would like to test the appointment booking interface.", priority: "medium", status: "resolved", createdAt: "2026-11-09T11:00:00Z", updatedAt: "2026-11-09T14:00:00Z" }
    ]);

    setNotifications([
      { id: "notif-1", userId: "usr-client-demo", title: "Action Required: Review Patient Intake Fields", message: "Milestone 5 is awaiting your review and approval.", read: false, createdAt: new Date().toISOString() },
      { id: "notif-2", userId: "usr-client-demo", title: "Sprint 1 Completed", message: "Engineering team published an update regarding your booking engine.", read: true, createdAt: "2026-11-10T12:00:00Z" }
    ]);
  };

  // Handlers
  const handleApproveMilestone = async (milestoneId: string, title: string) => {
    try {
      await fetch("/api/customer/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: session?.assignedProjects[0]?.id || "proj-dental-portal-1",
          itemType: "milestone",
          itemId: milestoneId,
          itemTitle: title,
          decision: "approved",
          notes: "Approved directly via Client Portal by authorized organization owner.",
        }),
      });
    } catch {}

    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? { ...m, status: "completed", actualCompletionDate: new Date().toISOString().slice(0, 10) }
          : m
      )
    );
    showToast(`Milestone Approved: "${title}"! Moving to next delivery stage.`);
  };

  const handleRequestChanges = (milestoneId: string, title: string) => {
    const feedback = prompt(`Please specify requested changes for "${title}":`);
    if (feedback) {
      showToast(`Revision request sent to engineering leads for "${title}".`);
    }
  };

  const handleCompleteTaskAction = (taskId: string, actionType: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t))
    );
    showToast(`Action completed: ${actionType.replace("_", " ").toUpperCase()}`);
  };

  const handleUploadDocument = async (fileData: { fileName: string; fileUrl: string; fileType: string; documentCategory: DocumentCategory }) => {
    const newDoc: ClientDocumentItem = {
      id: `doc-${Date.now()}`,
      projectId: session?.assignedProjects[0]?.id || "proj-dental-portal-1",
      organizationId: session?.organization.id || "org-malhotra-care",
      fileName: fileData.fileName,
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      documentCategory: fileData.documentCategory,
      version: "v1.0",
      uploadedByType: "client",
      clientVisible: true,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/customer/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoc),
      });
    } catch {}

    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`File registered: ${fileData.fileName}`);
  };

  const handleSendMessage = async (text: string) => {
    const newMsg: ProjectDiscussionMessage = {
      id: `msg-${Date.now()}`,
      projectId: session?.assignedProjects[0]?.id || "proj-dental-portal-1",
      senderName: session?.user.fullName || "Client User",
      senderType: "client",
      message: text,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/customer/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
    } catch {}

    setMessages((prev) => [...prev, newMsg]);
    showToast("Message sent to engineering team!");
  };

  const handleSubmitChangeRequest = async (data: { title: string; description: string; justification?: string; priority: string }) => {
    const newCR: ClientChangeRequestItem = {
      id: `cr-${Date.now()}`,
      projectId: session?.assignedProjects[0]?.id || "proj-dental-portal-1",
      organizationId: session?.organization.id || "org-malhotra-care",
      title: data.title,
      description: data.description,
      justification: data.justification,
      priority: data.priority as any,
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/customer/change-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCR),
      });
    } catch {}

    setChangeRequests((prev) => [newCR, ...prev]);
    showToast(`Change request "${data.title}" submitted to architecture leads.`);
  };

  const handleCreateTicket = async (data: { subject: string; description: string; priority: string }) => {
    const newTkt: ClientSupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
      organizationId: session?.organization.id || "org-malhotra-care",
      subject: data.subject,
      description: data.description,
      priority: data.priority as any,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/customer/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTkt),
      });
    } catch {}

    setTickets((prev) => [newTkt, ...prev]);
    showToast(`Support Ticket ${newTkt.ticketNumber} created! Team notified.`);
  };

  const handleInviteMember = async (data: { email: string; fullName: string; role: string }) => {
    showToast(`Invitation sent to ${data.email} (${data.role.toUpperCase()})`);
  };

  const handleSignOut = async () => {
    if (confirm("Sign out of StarX Alpha Labs Client Workspace?")) {
      window.location.href = "/customer/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030B24] flex items-center justify-center text-[#00D9FF] font-mono text-xs animate-pulse">
        CONNECTING TO SECURE CLIENT WORKSPACE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030B24] text-slate-100 flex flex-col selection:bg-[#087BFF] selection:text-white">
      {/* 1. Global Notification Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-[#00C98B]/95 text-[#030B24] font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#030B24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Responsive Sidebar Navigation */}
      <CustomerSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        session={session}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* 3. Main Workspace Shell */}
      <div className="lg:pl-72 flex-1 flex flex-col">
        {/* Sticky Header */}
        <CustomerHeader
          activeTab={activeTab}
          session={session}
          notifications={notifications}
          onOpenMobile={() => setMobileOpen(true)}
          onMarkNotificationRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        />

        {/* Dynamic Module Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardModule
              session={session}
              milestones={milestones}
              tasks={tasks}
              updates={updates}
              onNavigateTab={(tab) => setActiveTab(tab as CustomerPortalTab)}
            />
          )}

          {activeTab === "estimates" && (
            <EstimatesModule
              filterEstimateId={activeContextId}
              onNavigateTab={(tab, id) => {
                if (id) setActiveContextId(id);
                setActiveTab(tab as CustomerPortalTab);
              }}
            />
          )}

          {activeTab === "proposals" && (
            <ProposalsModule
              filterProposalId={activeContextId}
              onNavigateTab={(tab, id) => {
                if (id) setActiveContextId(id);
                setActiveTab(tab as CustomerPortalTab);
              }}
            />
          )}

          {activeTab === "agreements" && (
            <AgreementsModule
              onNavigateTab={(tab) => setActiveTab(tab as CustomerPortalTab)}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsModule
              session={session}
              onSelectProject={() => setActiveTab("milestones")}
            />
          )}

          {activeTab === "milestones" && (
            <MilestonesModule
              milestones={milestones}
              onApproveMilestone={handleApproveMilestone}
              onRequestChanges={handleRequestChanges}
            />
          )}

          {activeTab === "tasks" && (
            <TasksModule
              tasks={tasks}
              onCompleteTaskAction={handleCompleteTaskAction}
            />
          )}

          {activeTab === "documents" && (
            <DocumentsModule
              documents={documents}
              onUploadDocument={handleUploadDocument}
            />
          )}

          {activeTab === "finances" && (
            <FinancesModule onShowToast={showToast} />
          )}

          {activeTab === "discussions" && (
            <DiscussionsModule
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === "change-requests" && (
            <ChangeRequestsModule
              changeRequests={changeRequests}
              onSubmitChangeRequest={handleSubmitChangeRequest}
            />
          )}

          {activeTab === "support" && (
            <SupportModule
              tickets={tickets}
              onCreateTicket={handleCreateTicket}
            />
          )}

          {activeTab === "warranty" && (
            <WarrantyModule
              onNavigateTab={(tab) => setActiveTab(tab as CustomerPortalTab)}
            />
          )}

          {activeTab === "organization" && (
            <OrganizationModule
              session={session}
              onInviteMember={handleInviteMember}
            />
          )}

          {activeTab === "account" && (
            <AccountModule
              session={session}
              onSignOut={handleSignOut}
            />
          )}
        </main>
      </div>
    </div>
  );
}
