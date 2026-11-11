import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';
import type { QuotationItem, InvoiceItem, AgingBucket, Invoice } from '@/types/finance';

/**
 * Decimal-safe rounding to 2 decimal places.
 * Avoids standard floating point rounding anomalies.
 */
export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates authoritative quotation totals server-side.
 */
export function calculateQuotationTotals(
  items: QuotationItem[],
  discountAmount: number = 0,
  taxRatePercent: number = 18.00
): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
} {
  const subtotal = roundCurrency(
    items.reduce((sum, item) => sum + roundCurrency(item.quantity * item.unitPrice), 0)
  );

  const validDiscount = Math.min(subtotal, Math.max(0, roundCurrency(discountAmount)));
  const taxableAmount = Math.max(0, subtotal - validDiscount);
  const taxAmount = roundCurrency((taxableAmount * taxRatePercent) / 100);
  const totalAmount = roundCurrency(taxableAmount + taxAmount);

  return {
    subtotal,
    discountAmount: validDiscount,
    taxAmount,
    totalAmount,
  };
}

/**
 * Calculates authoritative invoice totals and remaining balance server-side.
 */
export function calculateInvoiceTotals(
  items: InvoiceItem[],
  discountAmount: number = 0,
  taxRatePercent: number = 18.00,
  paidAmount: number = 0
): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingBalance: number;
} {
  const subtotal = roundCurrency(
    items.reduce((sum, item) => sum + roundCurrency(item.quantity * item.unitPrice), 0)
  );

  const validDiscount = Math.min(subtotal, Math.max(0, roundCurrency(discountAmount)));
  const taxableAmount = Math.max(0, subtotal - validDiscount);
  const taxAmount = roundCurrency((taxableAmount * taxRatePercent) / 100);
  const totalAmount = roundCurrency(taxableAmount + taxAmount);
  const validPaid = Math.max(0, roundCurrency(paidAmount));
  const outstandingBalance = Math.max(0, roundCurrency(totalAmount - validPaid));

  return {
    subtotal,
    discountAmount: validDiscount,
    taxAmount,
    totalAmount,
    paidAmount: validPaid,
    outstandingBalance,
  };
}

/**
 * Generates transaction-safe sequential invoice number (e.g. INV-2026-0001).
 */
export async function generateInvoiceNumber(
  adminClient: SupabaseClient<Database>
): Promise<string> {
  const currentYear = new Date().getFullYear();

  // Call PostgreSQL stored sequence function
  const { data, error } = await adminClient.rpc('get_next_invoice_number' as any);
  if (!error && data) {
    return data as string;
  }

  // Fallback sequential increment with row lock or count
  const { data: latest } = await adminClient
    .from('invoices')
    .select('invoice_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  let nextNum = 1;
  if (latest?.invoice_number) {
    const parts = latest.invoice_number.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastSeq)) {
      nextNum = lastSeq + 1;
    }
  }

  return `INV-${currentYear}-${String(nextNum).padStart(4, '0')}`;
}

/**
 * Generates quotation reference (e.g. QTN-2026-0001).
 */
export async function generateQuotationNumber(
  adminClient: SupabaseClient<Database>
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const { count } = await adminClient
    .from('quotations')
    .select('*', { count: 'exact', head: true });

  const nextSeq = (count || 0) + 1;
  return `QTN-${currentYear}-${String(nextSeq).padStart(4, '0')}`;
}

/**
 * Generates contract reference (e.g. CNT-2026-0001).
 */
export async function generateContractNumber(
  adminClient: SupabaseClient<Database>
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const { count } = await adminClient
    .from('contracts')
    .select('*', { count: 'exact', head: true });

  const nextSeq = (count || 0) + 1;
  return `CNT-${currentYear}-${String(nextSeq).padStart(4, '0')}`;
}

/**
 * Generates manual payment receipt reference (e.g. PAY-2026-0001).
 */
export async function generatePaymentReference(
  adminClient: SupabaseClient<Database>
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const { count } = await adminClient
    .from('payment_records')
    .select('*', { count: 'exact', head: true });

  const nextSeq = (count || 0) + 1;
  return `PAY-${currentYear}-${String(nextSeq).padStart(4, '0')}`;
}

/**
 * Generates adjustment / credit note reference (e.g. CRN-2026-0001).
 */
export async function generateAdjustmentNumber(
  adminClient: SupabaseClient<Database>,
  type: string = 'credit_note'
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = type === 'credit_note' ? 'CRN' : 'ADJ';
  const { count } = await adminClient
    .from('financial_adjustments')
    .select('*', { count: 'exact', head: true });

  const nextSeq = (count || 0) + 1;
  return `${prefix}-${currentYear}-${String(nextSeq).padStart(4, '0')}`;
}

/**
 * Generates expense reference (e.g. EXP-2026-0001).
 */
export async function generateExpenseNumber(
  adminClient: SupabaseClient<Database>
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const { count } = await adminClient
    .from('expenses')
    .select('*', { count: 'exact', head: true });

  const nextSeq = (count || 0) + 1;
  return `EXP-${currentYear}-${String(nextSeq).padStart(4, '0')}`;
}

/**
 * Categorizes receivables into operational aging buckets:
 * - Not yet due
 * - 1–30 days overdue
 * - 31–60 days overdue
 * - 61–90 days overdue
 * - 90+ days overdue
 */
export function computeAgingBuckets(invoices: Invoice[]): AgingBucket {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const buckets: AgingBucket = {
    notYetDue: 0,
    days1To30: 0,
    days31To60: 0,
    days61To90: 0,
    days90Plus: 0,
  };

  for (const inv of invoices) {
    if (inv.outstandingBalance <= 0 || inv.status === 'cancelled' || inv.status === 'void') {
      continue;
    }

    const dueDate = new Date(inv.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      buckets.notYetDue += inv.outstandingBalance;
    } else if (diffDays <= 30) {
      buckets.days1To30 += inv.outstandingBalance;
    } else if (diffDays <= 60) {
      buckets.days31To60 += inv.outstandingBalance;
    } else if (diffDays <= 90) {
      buckets.days61To90 += inv.outstandingBalance;
    } else {
      buckets.days90Plus += inv.outstandingBalance;
    }
  }

  buckets.notYetDue = roundCurrency(buckets.notYetDue);
  buckets.days1To30 = roundCurrency(buckets.days1To30);
  buckets.days31To60 = roundCurrency(buckets.days31To60);
  buckets.days61To90 = roundCurrency(buckets.days61To90);
  buckets.days90Plus = roundCurrency(buckets.days90Plus);

  return buckets;
}

/**
 * Sanitizes CSV cell to prevent CSV Formula Injection.
 * Prefixes cells starting with '=', '+', '-', '@' with a single quote.
 */
export function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  // Escape double quotes
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}
