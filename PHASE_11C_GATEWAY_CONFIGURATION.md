# PHASE 11C — GATEWAY CONFIGURATION REPORT
## Merchant Provisioning & Provider Configuration
**Date:** November 11, 2026

---

### 1. Merchant Account Provisioning
StarX Alpha Labs operates as the primary merchant within the standalone gateway instance:
- **Merchant Legal Name:** StarX Alpha Labs Pvt Ltd
- **Primary Merchant Email:** `billing@starx-alpha-labs.com`
- **Merchant API Credentials:**
  - **Live Key:** `key_starx_prod_...`
  - **Live Secret:** `sec_starx_prod_...` (Stored securely in Vercel server-side environment variables `UPI_GATEWAY_API_KEY` and `UPI_GATEWAY_API_SECRET`).
  - **Sandbox Key:** `test_key_starx_sandbox_...`
  - **Sandbox Secret:** `test_sec_starx_sandbox_...`

---

### 2. Payment Providers Configuration

1. **Official Paytm Payment Gateway (`paytm_pg`):**
   - MID (Merchant ID) and Merchant Key configured in gateway settings.
   - Uses cryptographic HMAC-SHA256 signature verification directly against Paytm servers.
2. **Official PhonePe Payment Gateway (`phonepe_pg`):**
   - Configured with official Merchant ID, Salt Key, and Salt Index.
   - Uses official OAuth tokenized status checks.
3. **Generic UPI ID with Manual UTR Reconciliation (`generic_upi`):**
   - Default fallback provider for direct bank account settlement without intermediate transaction fees.
   - Dynamic QR codes generated on-the-fly (`upi://pay?pa=...&am=...&tr=...`).
4. **Paytm Business Web Scraping / Polling:**
   - **MANDATORY POLICY: DISABLED.** `GATEWAY_ENABLE_PAYTM_BUSINESS=false` is enforced.

---

### 3. Webhook Destinations
- **Live Webhook URL:** `https://starx-alpha-labs.vercel.app/api/webhooks/upi-gateway`
- **Sandbox Webhook URL:** `https://starx-alpha-labs.vercel.app/api/webhooks/upi-gateway`
- **Signing Secrets:** Unique 64-character hex secrets generated per environment and stored in `UPI_GATEWAY_WEBHOOK_SECRET` and `UPI_GATEWAY_SANDBOX_WEBHOOK_SECRET`.
