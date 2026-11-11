-- ==============================================================================
-- STARX ALPHA LABS — PHASE 9 CUSTOMER PORTAL & CLIENT WORKSPACE SCHEMA
-- Idempotent, Normalized, Multi-Tenant Client Architecture with RLS
-- Target Database: https://qznrkailsceimepcscmx.supabase.co
-- ==============================================================================

-- 1. CLIENT ORGANIZATIONS (Companies / Businesses)
CREATE TABLE IF NOT EXISTS public.client_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business_type TEXT,
  primary_contact_name TEXT NOT NULL,
  primary_contact_email TEXT NOT NULL,
  phone TEXT,
  country TEXT DEFAULT 'India',
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CLIENT MEMBERS (Links auth.users to client_organizations with RBAC)
CREATE TABLE IF NOT EXISTS public.client_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'invited')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_client_members_user_id ON public.client_members(user_id);
CREATE INDEX IF NOT EXISTS idx_client_members_org_id ON public.client_members(organization_id);

-- 3. CLIENT INVITATIONS (Token-Based Secure Onboarding)
CREATE TABLE IF NOT EXISTS public.client_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member', 'viewer')),
  token TEXT UNIQUE NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_invitations_token ON public.client_invitations(token);

-- 4. LINK CLIENT PROJECTS TO ORGANIZATIONS
ALTER TABLE public.client_projects 
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES public.client_organizations(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_client_projects_org_id ON public.client_projects(organization_id);

-- 5. PROJECT MILESTONES (13-Stage Detailed Delivery Tracking)
CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stage_order INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'awaiting_client', 'completed', 'delayed', 'on_hold')),
  planned_start_date DATE,
  target_delivery_date DATE,
  actual_completion_date DATE,
  deliverable_url TEXT,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON public.project_milestones(project_id);

-- 6. CLIENT-VISIBLE TASKS & ACTIONS
CREATE TABLE IF NOT EXISTS public.client_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  client_action TEXT NOT NULL DEFAULT 'none' CHECK (client_action IN ('none', 'review', 'approve', 'request_changes', 'upload_files', 'submit_feedback')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'awaiting_client', 'completed')),
  due_date DATE,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_tasks_project_id ON public.client_tasks(project_id);

-- 7. CLIENT DOCUMENTS & DELIVERABLES (Private Storage Metadata)
CREATE TABLE IF NOT EXISTS public.client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_bytes BIGINT,
  document_category TEXT NOT NULL DEFAULT 'deliverable' CHECK (document_category IN ('brief', 'architecture', 'ui_ux_design', 'deliverable', 'client_upload', 'report', 'handover')),
  version TEXT DEFAULT 'v1.0',
  uploaded_by_type TEXT NOT NULL DEFAULT 'admin' CHECK (uploaded_by_type IN ('admin', 'client')),
  uploaded_by_user UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_documents_project_id ON public.client_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_client_documents_org_id ON public.client_documents(organization_id);

-- 8. PROJECT UPDATES (Team Announcements to Clients)
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  author_name TEXT NOT NULL DEFAULT 'Engineering Lead',
  client_visible BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON public.project_updates(project_id);

-- 9. PROJECT DISCUSSIONS (Client <-> Team Messages)
CREATE TABLE IF NOT EXISTS public.project_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  sender_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'admin')),
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_discussions_project_id ON public.project_discussions(project_id);

-- 10. CLIENT APPROVALS (Formal Review & Acceptance Trail)
CREATE TABLE IF NOT EXISTS public.client_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('milestone', 'deliverable', 'sprint_review')),
  item_id TEXT NOT NULL,
  item_title TEXT NOT NULL,
  client_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'changes_requested')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_approvals_project_id ON public.client_approvals(project_id);

-- 11. CLIENT CHANGE REQUESTS
CREATE TABLE IF NOT EXISTS public.client_change_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  justification TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'accepted', 'rejected', 'completed')),
  admin_response TEXT,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_change_requests_project_id ON public.client_change_requests(project_id);

-- 12. CLIENT SUPPORT REQUESTS (Assistance & Help Tickets)
CREATE TABLE IF NOT EXISTS public.client_support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_for_client', 'resolved', 'closed')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_support_requests_org_id ON public.client_support_requests(organization_id);

-- 13. CLIENT NOTIFICATIONS (In-App Alerts)
CREATE TABLE IF NOT EXISTS public.client_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_notifications_user_id ON public.client_notifications(user_id);

-- ==============================================================================
-- SECURITY HELPER FUNCTIONS (PostgreSQL SECURITY DEFINER)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_client_member_of_org(check_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.client_members
    WHERE organization_id = check_org_id
      AND user_id = auth.uid()
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_client_member_of_project(check_project_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_org_id UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT organization_id INTO v_org_id
  FROM public.client_projects
  WHERE id = check_project_id;

  IF v_org_id IS NULL THEN
    RETURN false;
  END IF;

  RETURN public.is_client_member_of_org(v_org_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.client_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notifications ENABLE ROW LEVEL SECURITY;

-- 1. client_organizations
DROP POLICY IF EXISTS "Admin full client_organizations" ON public.client_organizations;
CREATE POLICY "Admin full client_organizations" ON public.client_organizations FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own organization" ON public.client_organizations;
CREATE POLICY "Client read own organization" ON public.client_organizations FOR SELECT USING (
  public.is_client_member_of_org(id)
);

-- 2. client_members
DROP POLICY IF EXISTS "Admin full client_members" ON public.client_members;
CREATE POLICY "Admin full client_members" ON public.client_members FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read fellow members" ON public.client_members;
CREATE POLICY "Client read fellow members" ON public.client_members FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

-- 3. client_invitations
DROP POLICY IF EXISTS "Admin full client_invitations" ON public.client_invitations;
CREATE POLICY "Admin full client_invitations" ON public.client_invitations FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Public verify invitation by token" ON public.client_invitations;
CREATE POLICY "Public verify invitation by token" ON public.client_invitations FOR SELECT USING (
  accepted_at IS NULL AND expires_at > NOW()
);

-- 4. client_projects
DROP POLICY IF EXISTS "Client read own projects" ON public.client_projects;
CREATE POLICY "Client read own projects" ON public.client_projects FOR SELECT USING (
  organization_id IS NOT NULL AND public.is_client_member_of_org(organization_id)
);

-- 5. project_milestones
DROP POLICY IF EXISTS "Admin full project_milestones" ON public.project_milestones;
CREATE POLICY "Admin full project_milestones" ON public.project_milestones FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read visible milestones" ON public.project_milestones;
CREATE POLICY "Client read visible milestones" ON public.project_milestones FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- 6. client_tasks
DROP POLICY IF EXISTS "Admin full client_tasks" ON public.client_tasks;
CREATE POLICY "Admin full client_tasks" ON public.client_tasks FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read visible tasks" ON public.client_tasks;
CREATE POLICY "Client read visible tasks" ON public.client_tasks FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- 7. client_documents
DROP POLICY IF EXISTS "Admin full client_documents" ON public.client_documents;
CREATE POLICY "Admin full client_documents" ON public.client_documents FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read visible documents" ON public.client_documents;
CREATE POLICY "Client read visible documents" ON public.client_documents FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client upload documents" ON public.client_documents;
CREATE POLICY "Client upload documents" ON public.client_documents FOR INSERT WITH CHECK (
  uploaded_by_type = 'client' AND public.is_client_member_of_project(project_id)
);

-- 8. project_updates
DROP POLICY IF EXISTS "Admin full project_updates" ON public.project_updates;
CREATE POLICY "Admin full project_updates" ON public.project_updates FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read visible updates" ON public.project_updates;
CREATE POLICY "Client read visible updates" ON public.project_updates FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- 9. project_discussions
DROP POLICY IF EXISTS "Admin full project_discussions" ON public.project_discussions;
CREATE POLICY "Admin full project_discussions" ON public.project_discussions FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read discussions" ON public.project_discussions;
CREATE POLICY "Client read discussions" ON public.project_discussions FOR SELECT USING (
  public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client post discussions" ON public.project_discussions;
CREATE POLICY "Client post discussions" ON public.project_discussions FOR INSERT WITH CHECK (
  sender_type = 'client' AND public.is_client_member_of_project(project_id)
);

-- 10. client_approvals
DROP POLICY IF EXISTS "Admin full client_approvals" ON public.client_approvals;
CREATE POLICY "Admin full client_approvals" ON public.client_approvals FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read approvals" ON public.client_approvals;
CREATE POLICY "Client read approvals" ON public.client_approvals FOR SELECT USING (
  public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client submit approvals" ON public.client_approvals;
CREATE POLICY "Client submit approvals" ON public.client_approvals FOR INSERT WITH CHECK (
  public.is_client_member_of_project(project_id)
);

-- 11. client_change_requests
DROP POLICY IF EXISTS "Admin full client_change_requests" ON public.client_change_requests;
CREATE POLICY "Admin full client_change_requests" ON public.client_change_requests FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read change requests" ON public.client_change_requests;
CREATE POLICY "Client read change requests" ON public.client_change_requests FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

DROP POLICY IF EXISTS "Client insert change requests" ON public.client_change_requests;
CREATE POLICY "Client insert change requests" ON public.client_change_requests FOR INSERT WITH CHECK (
  public.is_client_member_of_org(organization_id)
);

-- 12. client_support_requests
DROP POLICY IF EXISTS "Admin full client_support_requests" ON public.client_support_requests;
CREATE POLICY "Admin full client_support_requests" ON public.client_support_requests FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read support requests" ON public.client_support_requests;
CREATE POLICY "Client read support requests" ON public.client_support_requests FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

DROP POLICY IF EXISTS "Client insert support requests" ON public.client_support_requests;
CREATE POLICY "Client insert support requests" ON public.client_support_requests FOR INSERT WITH CHECK (
  public.is_client_member_of_org(organization_id)
);

-- 13. client_notifications
DROP POLICY IF EXISTS "Client access own notifications" ON public.client_notifications;
CREATE POLICY "Client access own notifications" ON public.client_notifications FOR ALL USING (
  user_id = auth.uid()
);
