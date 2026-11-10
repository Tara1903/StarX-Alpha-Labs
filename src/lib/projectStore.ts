"use client";

export type ProjectStage =
  | "Requirement Gathering"
  | "UI/UX Wireframing & Design"
  | "Architecture & Database Setup"
  | "Frontend / App UI Development"
  | "Backend & Business Logic"
  | "API & Third-Party Integration"
  | "Quality Assurance & Testing"
  | "Client Beta Review"
  | "Security & Performance Audit"
  | "Production Deployment"
  | "Client Training & Knowledge Transfer"
  | "Final Handover & IP Signoff"
  | "Active SLA Maintenance & Support";

export const PROJECT_STAGES: ProjectStage[] = [
  "Requirement Gathering",
  "UI/UX Wireframing & Design",
  "Architecture & Database Setup",
  "Frontend / App UI Development",
  "Backend & Business Logic",
  "API & Third-Party Integration",
  "Quality Assurance & Testing",
  "Client Beta Review",
  "Security & Performance Audit",
  "Production Deployment",
  "Client Training & Knowledge Transfer",
  "Final Handover & IP Signoff",
  "Active SLA Maintenance & Support"
];

export interface ProjectMilestone {
  stage: ProjectStage;
  completed: boolean;
  completionDate?: string;
  notes: string;
}

export interface ClientProject {
  id: string;
  projectCode: string;
  quotationId?: string;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  projectName: string;
  division?: "website" | "app" | "combo";
  packageCode?: string;
  currentStage: ProjectStage;
  progressPercent: number;
  startDate: string;
  targetHandoverDate: string;
  milestones: ProjectMilestone[];
  recentUpdates: { date: string; message: string; author: string }[];
  status: "Active" | "Completed" | "On Hold";
  totalBudget: number;
}

const STORAGE_KEY = "starx_client_projects";

export function getClientProjects(): ClientProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: ClientProject[] = [
        {
          id: "proj-101",
          projectCode: "PRJ-2026-001",
          quotationId: "qt-101",
          clientName: "Rajesh Kumar",
          clientBusiness: "Spice Garden Chains",
          clientEmail: "rajesh@spicegarden.in",
          projectName: "Multi-Outlet Restaurant ERP & Ordering System",
          division: "combo",
          packageCode: "C2",
          currentStage: "Frontend / App UI Development",
          progressPercent: 38,
          startDate: "2026-11-01",
          targetHandoverDate: "2026-11-28",
          milestones: PROJECT_STAGES.map((stage, idx) => ({
            stage,
            completed: idx < 3,
            completionDate: idx < 3 ? "2026-11-05" : undefined,
            notes: idx === 3 ? "Next.js web storefront & Flutter screens in active development" : idx < 3 ? "Completed & Approved" : "Pending"
          })),
          recentUpdates: [
            { date: "2026-11-08", message: "Supabase real-time table listeners wired to kitchen display terminal.", author: "Lead Architect" },
            { date: "2026-11-05", message: "Client signed off on high-fidelity POS wireframes and color scheme.", author: "Product Manager" }
          ],
          status: "Active",
          totalBudget: 118000
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function createProjectFromQuotation(quotation: any): ClientProject {
  const all = getClientProjects();
  const count = all.length + 1;
  const newProj: ClientProject = {
    id: `proj-${Date.now().toString(36)}`,
    projectCode: `PRJ-2026-${count.toString().padStart(3, "0")}`,
    quotationId: quotation.id,
    clientName: quotation.clientName,
    clientBusiness: quotation.clientBusiness,
    clientEmail: quotation.clientEmail,
    projectName: quotation.selectedSolution,
    division: quotation.division || "combo",
    packageCode: quotation.packageCode || "C2",
    currentStage: "Requirement Gathering",
    progressPercent: 8,
    startDate: new Date().toISOString().split("T")[0],
    targetHandoverDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    milestones: PROJECT_STAGES.map((s, idx) => ({
      stage: s,
      completed: idx === 0,
      completionDate: idx === 0 ? new Date().toISOString().split("T")[0] : undefined,
      notes: idx === 0 ? "Project initialized automatically from approved quotation." : "Pending"
    })),
    recentUpdates: [
      {
        date: new Date().toISOString().split("T")[0],
        message: `Project created from Approved Quotation ${quotation.quotationNumber}. Scope confirmed.`,
        author: "System Automation"
      }
    ],
    status: "Active",
    totalBudget: quotation.totalAmount
  };

  const updated = [newProj, ...all];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newProj;
}

export function advanceProjectStage(id: string, newStage: ProjectStage): void {
  const all = getClientProjects();
  const stageIdx = PROJECT_STAGES.indexOf(newStage);
  const progressPercent = Math.min(100, Math.round(((stageIdx + 1) / PROJECT_STAGES.length) * 100));

  const updated = all.map((p) => {
    if (p.id === id) {
      const updatedMilestones = p.milestones.map((m) => {
        const mIdx = PROJECT_STAGES.indexOf(m.stage);
        if (mIdx < stageIdx) {
          return { ...m, completed: true, completionDate: m.completionDate || new Date().toISOString().split("T")[0] };
        } else if (mIdx === stageIdx) {
          return { ...m, completed: false, notes: "Currently in progress" };
        }
        return m;
      });

      return {
        ...p,
        currentStage: newStage,
        progressPercent,
        milestones: updatedMilestones,
        recentUpdates: [
          {
            date: new Date().toISOString().split("T")[0],
            message: `Project advanced to stage: ${newStage}.`,
            author: "Engineering Manager"
          },
          ...p.recentUpdates
        ]
      };
    }
    return p;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
