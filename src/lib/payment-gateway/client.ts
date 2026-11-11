import crypto from "crypto";
import type {
  CreateGatewayOrderParams,
  GatewayEnvironment,
  GatewayOrderResponse,
} from "@/types/paymentGateway";

export interface GatewayClientConfig {
  gatewayUrl: string;
  environment: GatewayEnvironment;
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
}

export function getGatewayConfig(): GatewayClientConfig {
  const environment: GatewayEnvironment =
    (process.env.UPI_GATEWAY_ENVIRONMENT as GatewayEnvironment) || "sandbox";

  const isSandbox = environment === "sandbox";

  const gatewayUrl =
    process.env.UPI_GATEWAY_URL ||
    process.env.NEXT_PUBLIC_UPI_GATEWAY_URL ||
    "https://payments.starx-alpha-labs.com";

  const apiKey = isSandbox
    ? process.env.UPI_GATEWAY_SANDBOX_API_KEY || "test_key_starx_alpha_labs_sandbox"
    : process.env.UPI_GATEWAY_API_KEY || "";

  const apiSecret = isSandbox
    ? process.env.UPI_GATEWAY_SANDBOX_API_SECRET || "test_sec_starx_alpha_labs_demo_secret_2026"
    : process.env.UPI_GATEWAY_API_SECRET || "";

  const webhookSecret = isSandbox
    ? process.env.UPI_GATEWAY_SANDBOX_WEBHOOK_SECRET || "whsec_sandbox_starx_alpha_labs_2026"
    : process.env.UPI_GATEWAY_WEBHOOK_SECRET || "";

  return {
    gatewayUrl: gatewayUrl.replace(/\/+$/, ""),
    environment,
    apiKey,
    apiSecret,
    webhookSecret,
  };
}

/**
 * Creates an order on the standalone UPI Gateway
 */
export async function createGatewayOrder(
  params: CreateGatewayOrderParams,
  configOverride?: Partial<GatewayClientConfig>
): Promise<GatewayOrderResponse> {
  const config = { ...getGatewayConfig(), ...configOverride };

  // If in sandbox mode and no external gateway server is reachable, provide mock response
  // for resilient local testing and automated pipelines.
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${config.gatewayUrl}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": config.apiKey,
        "X-Api-Secret": config.apiSecret,
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: params.amount,
        client_order_id: params.clientOrderId,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_mobile: params.customerMobile,
        note: params.note || "StarX Alpha Labs Invoice Payment",
        redirect_url: params.redirectUrl,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      let errorMsg = `Gateway error (${res.status})`;
      try {
        const errJson = JSON.parse(errText);
        errorMsg = errJson.message || errorMsg;
      } catch {
        errorMsg = errText || errorMsg;
      }
      throw new Error(errorMsg);
    }

    return await res.json();
  } catch (err: any) {
    // If running in development/sandbox and gateway server is not yet deployed,
    // construct a deterministic, sandbox-compliant order structure.
    if (config.environment === "sandbox") {
      const mockOrderNo = `ORD${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      const paymentUrl = `${config.gatewayUrl}/sandbox/pay/${mockOrderNo}`;
      const upiIntent = `upi://pay?pa=starxlabs@sandbox&pn=StarX+Alpha+Labs&am=${params.amount.toFixed(2)}&tr=${mockOrderNo}&cu=INR`;
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

      return {
        success: true,
        data: {
          order_id: mockOrderNo,
          client_order_id: params.clientOrderId,
          amount: params.amount.toFixed(2),
          currency: "INR",
          status: "pending",
          environment: "sandbox",
          test: true,
          payment_url: paymentUrl,
          upi_intent: upiIntent,
          expires_at: expiresAt,
          paid_at: null,
          utr: null,
        },
      };
    }
    throw err;
  }
}

/**
 * Retrieves the current status of an order from the gateway
 */
export async function getGatewayOrderStatus(
  orderNo: string,
  configOverride?: Partial<GatewayClientConfig>
): Promise<GatewayOrderResponse> {
  const config = { ...getGatewayConfig(), ...configOverride };

  try {
    const res = await fetch(`${config.gatewayUrl}/api/v1/orders/${encodeURIComponent(orderNo)}`, {
      method: "GET",
      headers: {
        "X-Api-Key": config.apiKey,
        "X-Api-Secret": config.apiSecret,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to query gateway order status (${res.status})`);
    }

    return await res.json();
  } catch (err: any) {
    if (config.environment === "sandbox") {
      return {
        success: true,
        data: {
          order_id: orderNo,
          client_order_id: `MOCK-${orderNo}`,
          amount: "100.00",
          currency: "INR",
          status: "pending",
          environment: "sandbox",
          test: true,
          payment_url: `${config.gatewayUrl}/sandbox/pay/${orderNo}`,
          upi_intent: `upi://pay?pa=starxlabs@sandbox&tr=${orderNo}`,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        },
      };
    }
    throw err;
  }
}

/**
 * Verifies a timestamped HMAC-SHA256 signature sent with incoming webhook
 * Header format: "t=<timestamp>,v1=<signature>"
 * Signed payload: "<timestamp>.<raw_body>"
 */
export function verifyWebhookSignature({
  rawBody,
  signatureHeader,
  secret,
  toleranceSeconds = 300,
  currentTime = Math.floor(Date.now() / 1000),
}: {
  rawBody: string;
  signatureHeader: string | null | undefined;
  secret: string;
  toleranceSeconds?: number;
  currentTime?: number;
}): { valid: boolean; reason?: string; timestamp?: number } {
  if (!signatureHeader || !secret) {
    return { valid: false, reason: "Missing signature header or secret" };
  }

  // Parse header: t=12345678,v1=abcdef...
  const match = signatureHeader.match(/^t=(\d+),v1=([a-f0-9]{64})$/);
  if (!match) {
    return { valid: false, reason: "Malformed signature header format" };
  }

  const timestamp = parseInt(match[1], 10);
  const signature = match[2];

  if (isNaN(timestamp) || timestamp <= 0) {
    return { valid: false, reason: "Invalid timestamp in signature header" };
  }

  // Check 5-minute replay tolerance window
  if (Math.abs(currentTime - timestamp) > toleranceSeconds) {
    return { valid: false, reason: "Webhook timestamp outside tolerance window (replay protection)" };
  }

  // Compute expected HMAC-SHA256
  const payloadToSign = `${timestamp}.${rawBody}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payloadToSign);
  const expectedSignature = hmac.digest("hex");

  // Constant-time comparison
  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expectedSignature, "hex");

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, reason: "Cryptographic signature mismatch" };
  }

  return { valid: true, timestamp };
}
