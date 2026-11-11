# STARX ALPHA LABS — SUPER ADMIN PORTAL USER GUIDE
## Internal Operational Manual for Company Administrators & Leadership

**Audience**: StarX Alpha Labs Owners, System Administrators, Project Managers, and Content Editors  
**Portal Access**: `https://starx-alpha-labs.vercel.app/admin`  
**Authentication Requirement**: Supabase Authorized Administrator Credentials  

---

### 1. Navigating the Super Admin Portal

The Super Admin Portal is structured around a responsive **Left Navigation Sidebar** organized into six functional zones:

1. **Executive Overview**
   - **Dashboard**: Live high-level KPIs, pipeline value, active project count, urgent pending follow-ups, and ecosystem health status.
2. **Customer Relationship Management (CRM)**
   - **Unified CRM & Inquiries**: Master consolidated inbox for all inbound leads across Contact forms, Demo requests, Quote inquiries, and Calculator estimates.
   - **Personalized Demos**: Dedicated funnel for high-intent business demo requests (`DEMO-XXXXX`).
   - **Agency Partnerships**: Inbound pipeline for white-label digital agencies (`AGY-XXXXX`).
3. **Products & Showcases**
   - **Demo Center (160+)**: Comprehensive inventory of live interactive demos across 12 industries.
   - **Video Station**: Video walkthrough catalogue with responsive 16:9 previews and embed management.
4. **Content Management System (CMS)**
   - **Website CMS**: Direct management of Services, Divisions, Industries, Case Studies, and Blog Posts.
5. **Commercial Operations**
   - **Commercial & Pricing**: Standard Website (W), App (A), and Combo (C) packages, Calculator estimates review, Quotations Hub, and Client Project milestone advancing.
6. **Governance & Settings**
   - **Business Profile**: Indore HQ address, Founder contact, WhatsApp dispatch, corporate email, and STARX FLOW decoupling URL.
   - **Admin Team**: User privilege management across Owner, Admin, and Editor tiers.
   - **Audit Logs**: Filterable operational activity feed.
   - **Reports**: Analytical reports with one-click JSON export.

---

### 2. CRM & Lead Management Workflows

#### A. Inbound Lead Status Pipeline
Every inbound enquiry progresses through standardized operational stages:
- **New**: Fresh lead requiring first response within 2 hours.
- **Contacted**: Initial outreach performed via Email or WhatsApp.
- **Qualified**: Client budget, timeline, and scope validated.
- **Proposal Sent**: Formal quotation dispatched from the Quotations Hub.
- **Won**: Project agreement signed and initial milestone deposit received.
- **Lost**: Client disqualified or opted out (requires internal rationale note).

#### B. Direct WhatsApp Dispatch
Administrators can click the green **WhatsApp** button on any lead card to instantly launch WhatsApp Web or the WhatsApp desktop client with pre-filled context:
`"Hello [Name], thank you for reaching out to StarX Alpha Labs regarding your enquiry [ID]. Hari Singh and our engineering team would love to discuss your project requirements."`

#### C. Internal Notes & Scheduling
- Click the **Notes** icon on any lead to append private team observations.
- Set a **Follow-Up Date** to automatically populate the "Urgent Follow-ups Needed" counter on the Executive Dashboard.

---

### 3. Personalized Demo Request Funnel (`DEMO-XXXXX`)

When a client submits the 12-field Personalized Demo Request on the public website:
1. The lead arrives with an auto-generated tracking code: `DEMO-XXXXX`.
2. Open the **Personalized Demos** module to inspect the client's industry, business goals, team size, budget bracket, and delivery timeline.
3. Use the **Launch Personalized WhatsApp Intro** button to contact the prospect with reference to their specific business goals.

---

### 4. White-Label Agency Partnership Intake (`AGY-XXXXX`)

For digital agencies and consulting firms applying to outsource engineering:
1. Access the **Agency Partnerships** module.
2. Filter leads by partnership tier (**Silver**, **Gold**, **Platinum**) and expected monthly volume (**1–3 projects/mo**, **4–8 projects/mo**, **10+ projects/mo**).
3. Review requested white-label capabilities (Headless Web, Flutter Apps, Multi-tenant SaaS).
4. Update partner status to **Qualified** or **Approved** upon executing the NDA and SLA agreement.

---

### 5. Managing the 160+ Demo Catalog

1. Select **Demo Center (160+)** from the sidebar.
2. Filter demos by **Industry** (e.g. Restaurants, Healthcare, Real Estate, E-Commerce) or **Platform** (Web, Mobile, Desktop).
3. Use the live search bar to query specific keywords (e.g. "POS", "Booking", "Inventory").
4. Click **Edit** on any demo card to update descriptions, suitable business types, key features, or preview tags.
5. Click **Export Catalog (CSV)** to generate an offline inventory spreadsheet for client presentations.

---

### 6. Video Station Management

1. Navigate to **Video Station**.
2. Click **Add Video** to introduce a new industry showcase video.
3. Input the YouTube or Vimeo URL, title, industry category, duration text (e.g. `04:15`), and architecture highlights.
4. Toggle **"Pin to Homepage & Video Station Featured Carousel"** to feature top-tier walkthroughs.
5. Click the **Play** button on any video card to verify responsive 16:9 embedded playback inside the portal modal before publishing.

---

### 7. Commercial & Project Milestone Operations

#### A. Reviewing Calculator Estimates
1. Open **Commercial & Pricing** and select the **Calculator Estimates** tab.
2. Inspect scope selections, platform additions, and computed cost totals.
3. Click **"Convert to Formal Quotation"** to migrate the client estimate into the Quotations Hub.

#### B. Advancing Active Client Projects
1. Switch to the **Active Projects** tab.
2. Projects progress through a 13-stage delivery lifecycle:
   - *Requirement Gathering → UI/UX Wireframing → Architecture Setup → Frontend UI → Backend Logic → API Integration → QA Testing → Client Beta → Security Audit → Production Deployment → Client Training → Handover → Active SLA*.
3. Click **"→ [Next Stage]"** to advance the milestone stage and update progress percentages in real time.

---

### 8. Business Settings & Decoupled Architecture

1. Open **Business Profile** to review primary corporate identity.
2. Verified Company Details:
   - **Company**: StarX Alpha Labs
   - **Founder**: Hari Singh
   - **Indore HQ**: Vijay Nagar, Indore, Madhya Pradesh 452010, India
   - **Direct Hotline**: `+91 9660937033`
3. **Decoupled Products**:
   - The STARX FLOW ecosystem URL is set to `https://starx-flow.runs-on.dev/`.
   - The portal strictly enforces operational independence (zero shared authentication tokens, zero unified user databases).

---

### 9. Security & Role-Based Access Control (RBAC)

The portal implements three distinct administrative privilege tiers:
- **Owner**: Full system access, team provisioning, business profile edits, and commercial approval.
- **Admin**: CRM management, lead handling, quotation creation, and CMS content updates.
- **Editor**: Read-only CRM inspection and CMS content authoring.

All actions are logged to the **Audit Logs** feed with actor credentials, action timestamps, and resource identifiers.
