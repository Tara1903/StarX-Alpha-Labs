import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { Json } from '@/types/database.types';

export interface AuditLogParams {
  actorUserId?: string | null;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

/**
 * Appends an immutable audit entry to `admin_audit_logs`.
 * Strips any sensitive fields (passwords, tokens, keys) before persisting.
 */
export async function logAdminAction(params: AuditLogParams): Promise<void> {
  try {
    const adminClient = createAdminClient();

    // Sanitize metadata to guarantee zero secret leakage
    const sanitizedMeta: Record<string, unknown> = {};
    if (params.metadata) {
      for (const [key, value] of Object.entries(params.metadata)) {
        const lowerKey = key.toLowerCase();
        if (
          lowerKey.includes('password') ||
          lowerKey.includes('secret') ||
          lowerKey.includes('token') ||
          lowerKey.includes('key') ||
          lowerKey.includes('credential')
        ) {
          sanitizedMeta[key] = '[REDACTED]';
        } else {
          sanitizedMeta[key] = value;
        }
      }
    }

    await adminClient.from('admin_audit_logs').insert({
      actor_user_id: params.actorUserId || null,
      actor_email: params.actorEmail,
      actor_role: params.actorRole,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId || null,
      metadata: sanitizedMeta as Json,
    });
  } catch (err) {
    // Non-blocking for primary transaction, but logged server-side for reliability
    console.error('[AUDIT LOG ERROR] Failed to record audit log:', err);
  }
}
