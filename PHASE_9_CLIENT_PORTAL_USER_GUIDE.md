# PHASE 9 CLIENT PORTAL & WORKSPACE USER GUIDE
## STARX ALPHA LABS — ENTERPRISE CLIENT WORKSPACE
**Portal URL:** `https://starx-alpha-labs.vercel.app/customer`  
**Login URL:** `https://starx-alpha-labs.vercel.app/customer/login`  

---

## 1. WELCOME TO YOUR CLIENT WORKSPACE

The StarX Alpha Labs Client Workspace is your dedicated command center for collaborating with our engineering teams throughout your software development lifecycle. Here, you have complete visibility into your project milestones, live staging builds, deliverables, team discussions, and change requests.

---

## 2. PART 1: GUIDE FOR CLIENT TEAMS

### 2.1 First-Time Onboarding
1. **Receive Invitation**: You will receive an invitation link from your StarX Alpha Labs Engagement Manager (e.g. `https://starx-alpha-labs.vercel.app/customer/invite/<token>`).
2. **Review Organization Details**: The onboarding page confirms your company name and designated role.
3. **Set Password**: Enter a secure password (minimum 8 characters) and confirm it.
4. **Instant Access**: Click **Complete Activation**. You will be logged into your workspace immediately.

### 2.2 Navigating the Cockpit
The top navigation bar provides:
- **Global Search**: Search across your projects, milestones, deliverables, and tasks.
- **Notification Bell**: View real-time updates when an engineering lead posts a project update, requests an approval, or resolves a ticket.
- **Company Pill**: Displays your active organization name and current role.

### 2.3 Managing Your Projects
- Click the **Projects** tab on the left sidebar.
- Click any active project card to view complete specifications, delivery stage, total allocated budget, and assigned StarX technical lead.

### 2.4 Tracking 13-Stage Milestones & Approvals
- Navigate to the **Milestones** tab to view your project's chronological roadmap:
  - `01. Requirements & Discovery`
  - `02. System Architecture & Tech Stack`
  - `03. UI/UX Wireframes & Design Systems`
  - `04. Interactive Prototypes`
  - `05. Frontend Engineering`
  - `06. Backend, Database & Cloud Infrastructure`
  - `07. Third-Party Integrations & APIs`
  - `08. Quality Assurance & Automated Testing`
  - `09. Security Auditing & Penetration Tests`
  - `10. User Acceptance Testing (UAT)`
  - `11. Production Deployment & CI/CD Pipeline`
  - `12. Documentation & Client Handover`
  - `13. Post-Launch Warranty & Hypercare`
- When a milestone reaches **Awaiting Client**, review the linked deliverable (e.g. staging preview or test build) and click **Approve Milestone** or **Request Changes**.

### 2.5 Accessing Documents & Uploading Assets
- Navigate to the **Documents** tab.
- Filter files by category: *Briefs, Architecture, UI/UX, Deliverables, Handover*.
- Click **Download** to review files locally.
- To provide design assets, API keys, or content briefs, click **Upload File** and select your document.

### 2.6 Communicating with the Engineering Team
- Navigate to the **Discussions** tab.
- Read messages posted by the StarX engineering lead or product manager.
- Type your feedback or questions directly into the message composer and click **Send Message**.

### 2.7 Requesting Scope Changes
- If your business requirements evolve during development, navigate to the **Change Requests** tab.
- Click **Submit Change Request**.
- Provide a descriptive title, detail the desired scope adjustment, specify the business justification, and set the urgency level.
- Our engineering team will review the request and post formal cost and schedule impact assessments before proceeding.

### 2.8 Technical Support & Emergency Assistance
- If you encounter an urgent issue or bug during UAT or production hypercare, click the **Support** tab.
- Click **New Support Ticket** to open a ticket (`TKT-XXXXX`).
- For mission-critical production blockers, refer to the **Emergency Support Hotline** card on your dashboard.

### 2.9 Inviting Additional Team Members (Client Owners Only)
- If your account holds the `Client Owner` role, navigate to the **Organization** tab.
- Click **Invite Team Member**.
- Enter the colleague's email, full name, and assign their role (`Client Member` or `Client Viewer`). An invitation link will be generated for them.

---

## 3. PART 2: GUIDE FOR INTERNAL STARX PROJECT MANAGERS

### 3.1 Creating a New Client Organization
Internal admins provision client organizations via the Super Admin Portal or the admin API:
```bash
POST /api/admin/client-organizations
Content-Type: application/json

{
  "action": "create_org",
  "name": "Acme Innovations Corp",
  "businessType": "Enterprise SaaS",
  "primaryContactName": "Jane Doe",
  "primaryContactEmail": "jane@acme.com",
  "phone": "+1-555-0199",
  "country": "United States"
}
```

### 3.2 Generating a Client Invitation Link
```bash
POST /api/admin/client-organizations
Content-Type: application/json

{
  "action": "invite_member",
  "organizationId": "<org-uuid>",
  "email": "jane@acme.com",
  "fullName": "Jane Doe",
  "role": "client_owner"
}
```
The endpoint returns an `inviteUrl` (e.g. `https://starx-alpha-labs.vercel.app/customer/invite/<token>`). Send this link to the client stakeholder.

### 3.3 Linking an Existing Project to the Organization
```bash
POST /api/admin/client-organizations
Content-Type: application/json

{
  "action": "link_project",
  "projectId": "<project-uuid>",
  "organizationId": "<org-uuid>"
}
```

---

## 4. SECURITY REMINDER

- All workspace sessions are protected by TLS 1.3 encryption.
- Client credentials must never be shared across individuals. Each client stakeholder must accept their own individual invitation.
- StarX Alpha Labs will never ask for your account password via email or chat.
