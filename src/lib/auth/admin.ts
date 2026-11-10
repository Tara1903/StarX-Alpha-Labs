import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { AdminRole, AdminStatus } from '@/types/database.types';

export interface VerifiedAdminContext {
  userId: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number = 401) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

/**
 * Server-side administrator verification.
 * Strictly verifies the authenticated user session against the `admin_members` database table.
 * Never trusts client metadata or user_metadata.
 */
export async function requireAdmin(allowedRoles: AdminRole[] = ['owner', 'admin', 'editor']): Promise<VerifiedAdminContext> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthError('Authentication required. Please sign in to the administrative portal.', 401);
  }

  // Use privileged service client to verify admin membership directly in PostgreSQL
  const adminClient = createAdminClient();
  const { data: member, error: memberError } = await adminClient
    .from('admin_members')
    .select('id, user_id, email, role, status')
    .eq('user_id', user.id)
    .single();

  if (memberError || !member) {
    throw new AuthError('Administrative access denied. Account is not registered in the admin roster.', 403);
  }

  if (member.status !== 'active') {
    throw new AuthError('Administrative account is currently suspended. Contact the system owner.', 403);
  }

  if (!allowedRoles.includes(member.role)) {
    throw new AuthError(`Insufficient privileges. Required role: ${allowedRoles.join(' or ')}. Your role: ${member.role}`, 403);
  }

  return {
    userId: member.user_id,
    email: member.email,
    role: member.role,
    status: member.status,
  };
}

/**
 * Checks if current user is an admin without throwing, returning null if unauthorized.
 */
export async function getOptionalAdmin(): Promise<VerifiedAdminContext | null> {
  try {
    return await requireAdmin();
  } catch {
    return null;
  }
}
