"use client";

export interface DemoEnquiry {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  selectedDemoId?: number;
  selectedDemoName?: string;
  requiredFeatures: string[];
  projectDescription: string;
  estimatedBudget: string;
  expectedDeliveryDate: string;
  preferredContactMethod: "Email" | "Phone" | "WhatsApp";
  status: "New" | "Contacted" | "Qualified" | "Demo Scheduled" | "Quotation Sent" | "Negotiation" | "Converted" | "Lost";
  source: string;
  assignedSalesperson?: string;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "starx_crm_enquiries";

export function getEnquiries(): DemoEnquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic enquiries for CRM demo experience
      const initial: DemoEnquiry[] = [
        {
          id: "enq-101",
          name: "Rajesh Kumar",
          businessName: "Spice Garden Chains",
          email: "rajesh@spicegarden.in",
          phone: "+91 98765 43210",
          industry: "Restaurant, Food & Hospitality",
          selectedDemoId: 1,
          selectedDemoName: "Restaurant Website & Online Food Ordering",
          requiredFeatures: ["Table QR Ordering", "KOT System", "Delivery Tracking"],
          projectDescription: "Need a multi-outlet digital ordering system with kitchen display for 4 branches in Mumbai.",
          estimatedBudget: "₹75,000 - ₹1,00,000",
          expectedDeliveryDate: "Within 3 weeks",
          preferredContactMethod: "WhatsApp",
          status: "New",
          source: "Showcase Live Demo",
          assignedSalesperson: "Vikram Mehta",
          notes: ["Client requested sample KOT setup demonstration."],
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "enq-102",
          name: "Dr. Ananya Sharma",
          businessName: "Aura Dental Care",
          email: "dr.ananya@auradental.com",
          phone: "+91 98111 22334",
          industry: "Healthcare & Wellness",
          selectedDemoId: 58,
          selectedDemoName: "Dental Clinic Software",
          requiredFeatures: ["Doctor OPD Slot Booking", "EHR Record Vault", "Automated SMS Due Reminders"],
          projectDescription: "Automating appointments and dental treatment history records with patient SMS alerts.",
          estimatedBudget: "₹50,000 - ₹75,000",
          expectedDeliveryDate: "Within 1 month",
          preferredContactMethod: "Email",
          status: "Qualified",
          source: "Healthcare Category Page",
          assignedSalesperson: "Priya Nair",
          notes: ["Shared quotation draft #QT-2026-08."],
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          updatedAt: new Date().toISOString()
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

export function saveEnquiry(enquiry: Omit<DemoEnquiry, "id" | "status" | "source" | "notes" | "createdAt" | "updatedAt">): DemoEnquiry {
  const all = getEnquiries();
  const newEntry: DemoEnquiry = {
    ...enquiry,
    id: `enq-${Date.now().toString(36)}`,
    status: "New",
    source: "Web Demo Modal",
    notes: ["Received from online demo showcase"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newEntry, ...all];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newEntry;
}

export function updateEnquiryStatus(id: string, status: DemoEnquiry["status"], salesperson?: string, note?: string): void {
  const all = getEnquiries();
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(salesperson ? { assignedSalesperson: salesperson } : {}),
        ...(note ? { notes: [...item.notes, note] } : {}),
        updatedAt: new Date().toISOString(),
      };
    }
    return item;
  });
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
