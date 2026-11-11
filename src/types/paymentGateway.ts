/**
 * STARX ALPHA LABS — PHASE 11: PAYMENT GATEWAY TYPES
 * Integration with Mayank Singh UPI Gateway (Standalone Laravel 12 Microservice)
 */

export type GatewayEnvironment = 'sandbox' | 'live';
export type GatewayOrderStatus = 'created' | 'pending' | 'paid' | 'expired' | 'failed' | 'under_review';
export type GatewayProvider = 'generic_upi' | 'paytm_pg' | 'phonepe_pg';

export interface GatewaySettings {
  id: string;
  gatewayUrl: string;
  environment: GatewayEnvironment;
  webhookUrl: string;
  autoExpiryMinutes: number;
  isEnabled: boolean;
  activeProvider: GatewayProvider;
  updatedAt: string;
}

export interface CreateGatewayOrderParams {
  amount: number;
  clientOrderId: string;
  customerName?: string;
  customerEmail?: string;
  customerMobile?: string;
  note?: string;
  redirectUrl?: string;
}

export interface GatewayOrderResponse {
  success: boolean;
  data: {
    order_id: string;
    client_order_id: string;
    amount: string;
    currency: string;
    status: GatewayOrderStatus;
    environment: GatewayEnvironment;
    test: boolean;
    payment_url: string;
    upi_intent: string;
    utr?: string | null;
    expires_at?: string;
    paid_at?: string | null;
  };
  message?: string;
}

export interface GatewayTransaction {
  id: string;
  invoiceId: string;
  organizationId: string;
  gatewayOrderNo: string;
  clientOrderId: string;
  amount: number;
  currency: string;
  status: GatewayOrderStatus;
  environment: GatewayEnvironment;
  paymentUrl?: string | null;
  upiIntent?: string | null;
  utr?: string | null;
  paymentProvider?: string | null;
  paidAt?: string | null;
  expiresAt?: string | null;
  rawOrderResponse?: any;
  createdAt: string;
  updatedAt: string;
  // Joins
  invoiceNumber?: string;
  organizationName?: string;
}

export interface GatewayWebhookPayload {
  event_id: string;
  event_sequence: number;
  occurred_at: string;
  event: 'order.paid' | 'order.expired' | 'order.under_review' | 'order.failed' | 'order.pending' | 'order.timeout';
  data: {
    order_id: string;
    client_order_id: string;
    amount: string;
    currency: string;
    status: GatewayOrderStatus;
    environment: GatewayEnvironment;
    test: boolean;
    payment_url: string;
    upi_intent: string;
    utr?: string | null;
    expires_at?: string;
    paid_at?: string | null;
  };
}

export interface GatewayWebhookEvent {
  id: string;
  eventId: string;
  eventType: string;
  eventSequence?: number | null;
  environment: GatewayEnvironment;
  gatewayOrderNo?: string | null;
  payload: GatewayWebhookPayload;
  signatureHeader?: string | null;
  signatureValid: boolean;
  processed: boolean;
  processingError?: string | null;
  receivedAt: string;
  processedAt?: string | null;
}

export interface GatewayOverviewStats {
  environment: GatewayEnvironment;
  gatewayUrl: string;
  isConnected: boolean;
  totalTransactions: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalVolumeInr: number;
  recentWebhooksCount: number;
  recentTransactions: GatewayTransaction[];
  recentWebhooks: GatewayWebhookEvent[];
}
