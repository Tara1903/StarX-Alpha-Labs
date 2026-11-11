import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { 
  ClientRole, 
  ClientMemberStatus, 
  ClientOrganization, 
  ClientMember, 
  CustomerSessionContext 
} from '@/types/customerPortal';

export interface VerifiedClientContext {
  userId: string;
  email: string;
  fullName: string;
  role: ClientRole;
  status: ClientMemberStatus;
  organizationId: string;
  organizationName: string;
}

export class ClientAuthError extends Error {
  status: number;
  constructor(message: string, status: number = 401) {
    super(message);
    this.name = 'ClientAuthError';
    this.status = status;
  }
}

/**
 * Server-side client user verification.
 * Strictly verifies the authenticated user session against `client_members` and `client_organizations`.
 * Rejects suspended members and suspended organizations.
 */
export async function requireClientMember(
  allowedRoles: ClientRole[] = ['owner', 'member', 'viewer']
): Promise<VerifiedClientContext> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new ClientAuthError('Authentication required. Please sign in to your client portal.', 401);
  }

  const adminClient = createAdminClient();

  // 1. Check client membership
  const { data: member, error: memberError } = await adminClient
    .from('client_members')
    .select('id, organization_id, user_id, role, status, full_name, email')
    .eq('user_id', user.id)
    .maybeSingle();

  if (memberError || !member) {
    throw new ClientAuthError('Access denied. No active client membership associated with this account.', 403);
  }

  if (member.status !== 'active') {
    throw new ClientAuthError('Your client portal access is currently suspended. Please contact StarX Alpha Labs.', 403);
  }

  if (!allowedRoles.includes(member.role as ClientRole)) {
    throw new ClientAuthError(`Insufficient privileges. Required role: ${allowedRoles.join(' or ')}.`, 403);
  }

  // 2. Check organization status
  const { data: org, error: orgError } = await adminClient
    .from('client_organizations')
    .select('id, name, status')
    .eq('id', member.organization_id)
    .maybeSingle();

  if (orgError || !org || org.status !== 'active') {
    throw new ClientAuthError('Your organization workspace is currently inactive or suspended.', 403);
  }

  return {
    userId: user.id,
    email: member.email,
    fullName: member.full_name,
    role: member.role as ClientRole,
    status: member.status as ClientMemberStatus,
    organizationId: org.id,
    organizationName: org.name,
  };
}

/**
 * Retrieves the full customer session context with organization and assigned projects.
 */
export async function getClientSessionContext(): Promise<CustomerSessionContext | null> {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    // Fetch full organization
    const { data: org } = await adminClient
      .from('client_organizations')
      .select('*')
      .eq('id', verified.organizationId)
      .maybeSingle();

    // Fetch full membership
    const { data: member } = await adminClient
      .from('client_members')
      .select('*')
      .eq('user_id', verified.userId)
      .maybeSingle();

    // Fetch assigned projects for this organization
    const { data: projects } = await adminClient
      .from('client_projects')
      .select('id, project_code, solution_title, division, stage, total_cost')
      .eq('organization_id', verified.organizationId);

    if (!org || !member) {
      return null;
    }

    const formattedProjects = (projects || []).map((p) => ({
      id: p.id,
      projectCode: p.project_code,
      projectName: p.solution_title,
      division: p.division,
      currentStage: p.stage,
      progressPercent: 35, // Computed or default
      totalBudget: Number(p.total_cost || 0),
      status: 'Active',
    }));

    return {
      user: {
        id: verified.userId,
        email: verified.email,
        fullName: verified.fullName,
      },
      organization: {
        id: org.id,
        name: org.name,
        businessType: org.business_type || undefined,
        primaryContactName: org.primary_contact_name,
        primaryContactEmail: org.primary_contact_email,
        phone: org.phone || undefined,
        country: org.country || 'India',
        address: org.address || undefined,
        status: (org.status as 'active' | 'suspended') || 'active',
        createdAt: org.created_at,
      },
      membership: {
        id: member.id,
        organizationId: member.organization_id,
        userId: member.user_id,
        role: member.role as ClientRole,
        status: (member.status as ClientMemberStatus) || 'active',
        fullName: member.full_name,
        email: member.email,
        createdAt: member.created_at,
      },
      assignedProjects: formattedProjects,
    };
  } catch {
    return null;
  }
}
