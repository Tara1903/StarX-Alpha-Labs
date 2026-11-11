import { NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { computeAgingBuckets, roundCurrency } from '@/lib/finance/calculator';
import type { Invoice, FinanceOverviewStats } from '@/types/finance';

export async function GET() {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    // 1. Fetch Invoices
    const { data: invoicesData } = await adminClient
      .from('invoices')
      .select('*');

    const invoices = (invoicesData || []) as any[];

    // 2. Fetch Expenses
    const { data: expensesData } = await adminClient
      .from('expenses')
      .select('amount, approval_status');

    const expenses = (expensesData || []) as any[];

    // 3. Fetch Quotations
    const { data: quotationsData } = await adminClient
      .from('quotations')
      .select('status, total_amount');

    const quotations = (quotationsData || []) as any[];

    // 4. Compute Totals
    let totalInvoiced = 0;
    let totalCollected = 0;
    let totalOutstanding = 0;
    let totalOverdue = 0;

    const invoiceCounts = {
      total: invoices.length,
      paid: 0,
      partiallyPaid: 0,
      issued: 0,
      overdue: 0,
      draft: 0,
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const formattedInvoices: Invoice[] = invoices.map((inv) => {
      const invTotal = Number(inv.total_amount || 0);
      const invPaid = Number(inv.paid_amount || 0);
      const invBal = Number(inv.outstanding_balance || 0);

      if (inv.status !== 'cancelled' && inv.status !== 'void') {
        totalInvoiced += invTotal;
        totalCollected += invPaid;
        totalOutstanding += invBal;

        if (inv.status === 'overdue' || (new Date(inv.due_date) < now && invBal > 0)) {
          totalOverdue += invBal;
        }
      }

      if (inv.status === 'paid') invoiceCounts.paid++;
      else if (inv.status === 'partially_paid') invoiceCounts.partiallyPaid++;
      else if (inv.status === 'issued') invoiceCounts.issued++;
      else if (inv.status === 'overdue') invoiceCounts.overdue++;
      else if (inv.status === 'draft') invoiceCounts.draft++;

      return {
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        organizationId: inv.organization_id,
        projectId: inv.project_id,
        quotationId: inv.quotation_id,
        contractId: inv.contract_id,
        clientName: inv.client_name,
        clientEmail: inv.client_email,
        clientBusiness: inv.client_business,
        billingAddress: inv.billing_address,
        issueDate: inv.issue_date,
        dueDate: inv.due_date,
        currency: inv.currency,
        items: inv.items || [],
        subtotal: Number(inv.subtotal || 0),
        discountAmount: Number(inv.discount_amount || 0),
        taxName: inv.tax_name,
        taxRatePercent: Number(inv.tax_rate_percent || 18),
        taxAmount: Number(inv.tax_amount || 0),
        totalAmount: invTotal,
        paidAmount: invPaid,
        outstandingBalance: invBal,
        status: inv.status,
        paymentTerms: inv.payment_terms,
        notes: inv.notes,
        createdAt: inv.created_at,
        updatedAt: inv.updated_at,
      };
    });

    // Compute expenses
    let totalExpenses = 0;
    expenses.forEach((e) => {
      if (e.approval_status === 'approved') {
        totalExpenses += Number(e.amount || 0);
      }
    });

    // Compute quotations counts
    const quotationCounts = {
      total: quotations.length,
      accepted: quotations.filter((q) => q.status === 'accepted').length,
      sent: quotations.filter((q) => q.status === 'sent').length,
      draft: quotations.filter((q) => q.status === 'draft').length,
      rejected: quotations.filter((q) => q.status === 'rejected').length,
    };

    const agingBuckets = computeAgingBuckets(formattedInvoices);

    const stats: FinanceOverviewStats = {
      totalInvoiced: roundCurrency(totalInvoiced),
      totalCollected: roundCurrency(totalCollected),
      totalOutstanding: roundCurrency(totalOutstanding),
      totalOverdue: roundCurrency(totalOverdue),
      totalExpenses: roundCurrency(totalExpenses),
      netOperatingCashflow: roundCurrency(totalCollected - totalExpenses),
      invoiceCounts,
      quotationCounts,
    };

    return NextResponse.json({
      stats,
      agingBuckets,
      recentInvoices: formattedInvoices.slice(0, 10),
    });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
