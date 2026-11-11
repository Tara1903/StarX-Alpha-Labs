import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export async function GET() {
  try {
    await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    // Fetch organizations
    const { data: orgs, error } = await adminClient
      .from('client_organizations')
      .select('*, client_members(*), client_projects(*)')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ organizations: orgs || [] });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const body = await req.json();

    const { action } = body;
    const adminClient = createAdminClient();

    // Action 1: Create Organization
    if (action === 'create_org') {
      const { name, businessType, primaryContactName, primaryContactEmail, phone, country } = body;

      if (!name || !primaryContactName || !primaryContactEmail) {
        return NextResponse.json(
          { error: 'Organization name, contact name, and contact email are required.' },
          { status: 400 }
        );
      }

      const { data: org, error } = await adminClient
        .from('client_organizations')
        .insert({
          name,
          business_type: businessType || null,
          primary_contact_name: primaryContactName,
          primary_contact_email: primaryContactEmail,
          phone: phone || null,
          country: country || 'India',
          status: 'active',
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Log to admin audit logs
      await adminClient.from('admin_audit_logs').insert({
        actor_user_id: verified.userId,
        actor_email: verified.email,
        actor_role: verified.role,
        action: 'CREATE_CLIENT_ORG',
        entity_type: 'client_organizations',
        entity_id: org.id,
        metadata: { orgName: name, contact: primaryContactEmail },
      });

      return NextResponse.json({ success: true, organization: org });
    }

    // Action 2: Generate Client Invitation Token
    if (action === 'invite_member') {
      const { organizationId, email, fullName, role } = body;

      if (!organizationId || !email || !fullName) {
        return NextResponse.json(
          { error: 'Organization ID, email, and full name are required.' },
          { status: 400 }
        );
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

      const { data: invite, error } = await adminClient
        .from('client_invitations')
        .insert({
          organization_id: organizationId,
          email,
          full_name: fullName,
          role: role || 'member',
          token,
          invited_by: verified.userId,
          expires_at: expiresAt,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://starx-alpha-labs.vercel.app'}/customer/invite/${token}`;

      return NextResponse.json({
        success: true,
        invitation: invite,
        inviteUrl,
      });
    }

    // Action 3: Link Project to Organization
    if (action === 'link_project') {
      const { projectId, organizationId } = body;

      if (!projectId || !organizationId) {
        return NextResponse.json(
          { error: 'Project ID and Organization ID are required.' },
          { status: 400 }
        );
      }

      const { error } = await adminClient
        .from('client_projects')
        .update({ organization_id: organizationId })
        .eq('id', projectId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
