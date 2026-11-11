import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateExpenseNumber, roundCurrency } from '@/lib/finance/calculator';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const projectId = searchParams.get('projectId');

    let query = adminClient
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }
    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data: expenses, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ expenses: expenses || [] });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();
    const body = await req.json();

    const {
      title,
      category,
      description,
      amount,
      currency,
      expenseDate,
      vendor,
      projectId,
      receiptUrl,
      approvalStatus,
    } = body;

    if (!title || !category || !amount || !vendor) {
      return NextResponse.json(
        { error: 'Expense title, category, amount, and vendor are required.' },
        { status: 400 }
      );
    }

    const expAmount = roundCurrency(Number(amount));
    const expenseNumber = body.expenseNumber || await generateExpenseNumber(adminClient);

    const { data: expense, error } = await adminClient
      .from('expenses')
      .insert({
        expense_number: expenseNumber,
        title,
        category,
        description: description || null,
        amount: expAmount,
        currency: currency || 'INR',
        expense_date: expenseDate || new Date().toISOString().split('T')[0],
        vendor,
        project_id: projectId || null,
        receipt_url: receiptUrl || null,
        approval_status: approvalStatus || 'approved',
        recorded_by: verified.userId,
        approved_by: approvalStatus === 'approved' ? verified.userId : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'RECORD_EXPENSE',
      entity_type: 'expense',
      entity_id: expense.id,
      metadata: { expenseNumber, category, amount: expAmount, vendor },
    });

    return NextResponse.json({ success: true, expense });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
