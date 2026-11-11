/**
 * STARX ALPHA LABS — PHASE 10: FINANCE & COMMERCIAL TYPES
 * Enterprise Record Management (ABSOLUTELY NO PAYMENT GATEWAY)
 */

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'AED' | 'GBP';

export interface FinanceSettings {
  id: string;
  defaultCurrency: CurrencyCode;
  supportedCurrencies: CurrencyCode[];
  invoicePrefix: string;
  quotationPrefix: string;
  contractPrefix: string;
  fiscalYearStartMonth: number;
  defaultPaymentTermsDays: number;
  defaultQuotationValidityDays: number;
  taxName: string;
  defaultTaxRate: number;
  taxIdNumber?: string | null;
  companyLegalName: string;
  companyBillingAddress?: string | null;
  bankPaymentInstructions: {
    beneficiaryName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    upiId?: string;
    notes?: string;
  };
  updatedAt: string;
}

export type QuotationStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'sent'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'cancelled';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  amount: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  organizationId?: string | null;
  organizationName?: string;
  projectId?: string | null;
  projectName?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  clientBusiness?: string | null;
  division: string;
  packageCode?: string | null;
  packageName?: string | null;
  scopeDescription: string;
  items: QuotationItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: CurrencyCode;
  status: QuotationStatus;
  version: number;
  validUntil?: string | null;
  termsAndConditions?: string | null;
  clientNotes?: string | null;
  acceptedBy?: string | null;
  acceptedAt?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ContractType =
  | 'website_agreement'
  | 'app_agreement'
  | 'software_master_services'
  | 'maintenance_sla'
  | 'project_nda'
  | 'custom';

export type ContractStatus =
  | 'draft'
  | 'internal_review'
  | 'ready_for_client'
  | 'sent'
  | 'awaiting_signature'
  | 'executed'
  | 'active'
  | 'expired'
  | 'terminated'
  | 'cancelled';

export interface Contract {
  id: string;
  contractNumber: string;
  organizationId: string;
  organizationName?: string;
  projectId?: string | null;
  projectName?: string;
  quotationId?: string | null;
  title: string;
  contractType: ContractType;
  effectiveDate: string;
  expiryDate?: string | null;
  contractValue: number;
  currency: CurrencyCode;
  status: ContractStatus;
  documentUrl?: string | null;
  termsSummary?: string | null;
  clientVisible: boolean;
  signedOfflineAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus =
  | 'draft'
  | 'approved'
  | 'issued'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'void';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  organizationId: string;
  organizationName?: string;
  projectId?: string | null;
  projectName?: string;
  quotationId?: string | null;
  contractId?: string | null;
  clientName: string;
  clientEmail: string;
  clientBusiness?: string | null;
  billingAddress?: string | null;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  items: InvoiceItem[];
  subtotal: number;
  discountAmount: number;
  taxName: string;
  taxRatePercent: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingBalance: number;
  status: InvoiceStatus;
  paymentTerms?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod =
  | 'bank_transfer'
  | 'neft_rtgs'
  | 'imps'
  | 'upi_manual'
  | 'cheque'
  | 'cash'
  | 'other_offline';

export type PaymentVerificationStatus =
  | 'pending_verification'
  | 'verified'
  | 'rejected'
  | 'reversed';

export interface PaymentRecord {
  id: string;
  paymentReference: string;
  invoiceId: string;
  invoiceNumber?: string;
  organizationId: string;
  organizationName?: string;
  amountReceived: number;
  currency: CurrencyCode;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  externalTransactionRef?: string | null;
  internalNotes?: string | null;
  recordedBy: string;
  recorderEmail?: string;
  verifiedBy?: string | null;
  verificationStatus: PaymentVerificationStatus;
  receiptUrl?: string | null;
  verifiedAt?: string | null;
  createdAt: string;
}

export type AdjustmentType =
  | 'credit_note'
  | 'write_off'
  | 'discount_adjustment'
  | 'refund_recorded'
  | 'reversal';

export type AdjustmentStatus =
  | 'draft'
  | 'pending_approval'
  | 'applied'
  | 'rejected'
  | 'void';

export interface FinancialAdjustment {
  id: string;
  adjustmentNumber: string;
  invoiceId: string;
  invoiceNumber?: string;
  organizationId: string;
  organizationName?: string;
  paymentId?: string | null;
  adjustmentType: AdjustmentType;
  amount: number;
  currency: CurrencyCode;
  reason: string;
  status: AdjustmentStatus;
  createdBy: string;
  approvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory =
  | 'software_subscriptions'
  | 'hosting_infrastructure'
  | 'hardware_equipment'
  | 'marketing'
  | 'travel'
  | 'professional_services'
  | 'office'
  | 'other';

export type ExpenseApprovalStatus =
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected';

export interface Expense {
  id: string;
  expenseNumber: string;
  title: string;
  category: ExpenseCategory;
  description?: string | null;
  amount: number;
  currency: CurrencyCode;
  expenseDate: string;
  vendor: string;
  projectId?: string | null;
  projectName?: string;
  receiptUrl?: string | null;
  approvalStatus: ExpenseApprovalStatus;
  recordedBy: string;
  approvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceOverviewStats {
  totalInvoiced: number;
  totalCollected: number;
  totalOutstanding: number;
  totalOverdue: number;
  totalExpenses: number;
  netOperatingCashflow: number;
  invoiceCounts: {
    total: number;
    paid: number;
    partiallyPaid: number;
    issued: number;
    overdue: number;
    draft: number;
  };
  quotationCounts: {
    total: number;
    accepted: number;
    sent: number;
    draft: number;
    rejected: number;
  };
}

export interface AgingBucket {
  notYetDue: number;
  days1To30: number;
  days31To60: number;
  days61To90: number;
  days90Plus: number;
}
