# PHASE 9 PERMISSION MATRIX & ROLE-BASED ACCESS CONTROL
## STARX ALPHA LABS — CLIENT PORTAL AUTHORIZATION SYSTEM
**Date:** November 11, 2026  
**Security Standard:** Principle of Least Privilege (PoLP)  
**Authentication Engine:** Supabase JWT with Server-Side Session Verification  

---

## 1. ROLE DEFINITIONS

The StarX Alpha Labs platform maintains strict architectural segregation between **Internal Company Administrators** and **External Corporate Clients**.

### 1.1 Internal Administrative Roles (`admin_members`)
- **`owner`**: Complete authority over all StarX infrastructure, financial records, client organizations, and administrative assignments.
- **`super_admin` / `admin`**: Full administrative access across CMS, CRM, client project allocation, and technical oversight.
- **`support` / `editor`**: Operational staff handling customer enquiries, tickets, and content updates.

### 1.2 External Client Roles (`client_members`)
- **`client_owner`**: The primary executive or project sponsor at the client organization. Holds full administrative rights over their corporate organization workspace, team member invitations, milestone approvals, document uploads, change request submissions, and support escalations.
- **`client_member`**: Active corporate collaborator (e.g. Lead Product Manager, QA Lead, Technical Architect). Can review milestones, complete action items, upload files, participate in technical discussions, submit change requests, and open support tickets.
- **`client_viewer`**: Read-only stakeholder (e.g. executive observer, auditor). Can view project progress, milestones, team announcements, and shared deliverables without modification privileges.

---

## 2. COMPREHENSIVE PERMISSION GRID

| Feature / Resource | Internal Admin | Client Owner | Client Member | Client Viewer |
|---|:---:|:---:|:---:|:---:|
| **Create Client Organization** |  Full |  None |  None |  None |
| **View Organization Profile** |  Full |  Own Org |  Own Org |  Own Org |
| **Edit Organization Profile** |  Full |  Own Org |  None |  None |
| **Invite Client Team Members** |  Full |  Own Org |  None |  None |
| **Remove Client Team Members** |  Full |  Own Org |  None |  None |
| **Assign Project to Organization** |  Full |  None |  None |  None |
| **View Assigned Projects** |  Full |  Assigned |  Assigned |  Assigned |
| **Track 13-Stage Milestones** |  Full |  Assigned |  Assigned |  Assigned |
| **Sign-Off / Approve Milestone** |  Full |  Assigned |  Assigned |  None |
| **View Client-Visible Tasks** |  Full |  Assigned |  Assigned |  Assigned |
| **Update Task Status / Complete** |  Full |  Assigned |  Assigned |  None |
| **Download Deliverables & Docs** |  Full |  Assigned |  Assigned |  Assigned |
| **Upload Deliverable / Files** |  Full |  Assigned |  Assigned |  None |
| **Publish Project Updates** |  Full |  None |  None |  None |
| **View Project Updates** |  Full |  Assigned |  Assigned |  Assigned |
| **Read Project Discussions** |  Full |  Assigned |  Assigned |  Assigned |
| **Post Discussion Message** |  Full |  Assigned |  Assigned |  None |
| **Submit Change Request** |  Full |  Assigned |  Assigned |  None |
| **Approve / Reject Change Request**|  Full |  None |  None |  None |
| **Create Support Ticket** |  Full |  Assigned |  Assigned |  Assigned |
| **Resolve / Close Support Ticket** |  Full |  Own Org |  Own Org |  None |
| **Receive In-App Notifications** |  Admin Inbox |  Own User |  Own User |  Own User |

---

## 3. ROW-LEVEL SECURITY (RLS) ENFORCEMENT RULES

Every database query is gated at the PostgreSQL engine level via Row-Level Security:

### 3.1 Organization Boundary
Clients can only select or update records where `is_client_member_of_org(organization_id)` returns true:
```sql
CREATE POLICY "Client read own organization" ON public.client_organizations
FOR SELECT USING (public.is_client_member_of_org(id));
```

### 3.2 Project Boundary
Clients can only view projects assigned to their organization:
```sql
CREATE POLICY "Client read own projects" ON public.client_projects
FOR SELECT USING (
  organization_id IS NOT NULL 
  AND public.is_client_member_of_org(organization_id)
);
```

### 3.3 Milestone & Deliverable Isolation
Sub-resources (milestones, tasks, documents, updates, discussions, approvals) require that the associated project belongs to the client's organization:
```sql
CREATE POLICY "Client read own milestones" ON public.project_milestones
FOR SELECT USING (
  client_visible = true 
  AND public.is_client_member_of_project(project_id)
);
```

### 3.4 Admin Access
Internal StarX Alpha Labs administrators bypass organization restrictions via `public.is_admin()` or the secure service role key:
```sql
CREATE POLICY "Admin full access" ON public.client_organizations
FOR ALL USING (auth.role() = 'service_role' OR public.is_admin());
```

---

## 4. API & CLIENT-SIDE ENFORCEMENT

1. **Server Guard (`src/lib/auth/customer.ts`)**:
   - `requireClientMember()` runs on every API request.
   - Rejects unauthenticated requests with HTTP `401 Unauthorized`.
   - Rejects non-members or suspended accounts with HTTP `403 Forbidden`.
   - Enforces specific role parameters where higher privilege is needed (e.g. `client_owner` for invitations).
2. **Client-Side Guarding (`src/components/customer/`)**:
   - Non-owner users cannot see or trigger the team invitation modal.
   - Viewer accounts render interactive actions (approval buttons, file dropzones, discussion inputs) in disabled or hidden state.
