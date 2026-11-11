import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { sanitizeCsvCell, roundCurrency } from '@/lib/finance/calculator';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const reportType = searchParams.get('type') || 'summary';
    const format = searchParams.get('format'); // 'json' or 'csv'

    // Fetch invoices, payments, expenses
    const { data: invoices } = await adminClient.from('invoices').select('*');
    const { data: payments } = await adminClient.from('payment_records').select('*');
    const { data: expenses } = await adminClient.from('expenses').select('*');

    // 1. CSV Export Mode
    if (format === 'csv') {
      if (reportType === 'invoices') {
        let csv = 'Invoice Number,Client Name,Client Email,Issue Date,Due Date,Subtotal,Tax,Total Amount,Paid Amount,Outstanding Balance,Status\n';
        (invoices || []).forEach((inv) => {
          csv += [
            sanitizeCsvCell(inv.invoice_number),
            sanitizeCsvCell(inv.client_name),
            sanitizeCsvCell(inv.client_email),
            sanitizeCsvCell(inv.issue_date),
            sanitizeCsvCell(inv.due_date),
            sanitizeCsvCell(inv.subtotal),
            sanitizeCsvCell(inv.tax_amount),
            sanitizeCsvCell(inv.total_amount),
            sanitizeCsvCell(inv.paid_amount),
            sanitizeCsvCell(inv.outstanding_balance),
            sanitizeCsvCell(inv.status),
          ].join(',') + '\n';
        });

        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="invoices-report-${new Date().toISOString().split('T')[0]}.csv"`,
          },
        });
      }

      if (reportType === 'payments') {
        let csv = 'Payment Reference,Invoice ID,Amount,Currency,Payment Date,Method,Transaction Ref,Status\n';
        (payments || []).forEach((p) => {
          csv += [
            sanitizeCsvCell(p.payment_reference),
            sanitizeCsvCell(p.invoice_id),
            sanitizeCsvCell(p.amount_received),
            sanitizeCsvCell(p.currency),
            sanitizeCsvCell(p.payment_date),
            sanitizeCsvCell(p.payment_method),
            sanitizeCsvCell(p.external_transaction_ref || 'N/A'),
            sanitizeCsvCell(p.verification_status),
          ].join(',') + '\n';
        });

        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="payments-report-${new Date().toISOString().split('T')[0]}.csv"`,
          },
        });
      }
    }

    // 2. Client-wise billing aggregation
    const clientSummaryMap: Record<string, {
      clientName: string;
      invoicesCount: number;
      totalInvoiced: number;
      totalPaid: number;
      outstanding: number;
    }> = {};

    (invoices || []).forEach((inv) => {
      const key = inv.organization_id || inv.client_email;
      if (!clientSummaryMap[key]) {
        clientSummaryMap[key] = {
          clientName: inv.client_business || inv.client_name,
          invoicesCount: 0,
          totalInvoiced: 0,
          totalPaid: 0,
          outstanding: 0,
        };
      }
      clientSummaryMap[key].invoicesCount++;
      clientSummaryMap[key].totalInvoiced += Number(inv.total_amount || 0);
      clientSummaryMap[key].totalPaid += Number(inv.paid_amount || 0);
      clientSummaryMap[key].outstanding += Number(inv.outstanding_balance || 0);
    });

    const clientSummaries = Object.values(clientSummaryMap).map((c) => ({
      ...c,
      totalInvoiced: roundCurrency(c.totalInvoiced),
      totalPaid: roundCurrency(c.totalPaid),
      outstanding: roundCurrency(c.outstanding),
    }));

    return NextResponse.json({
      clientSummaries,
      totalInvoicesCount: (invoices || []).length,
      totalPaymentsCount: (payments || []).length,
      totalExpensesCount: (expenses || []).length,
    });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
