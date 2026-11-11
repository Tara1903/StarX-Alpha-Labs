# PHASE 11H — SECURITY & COMPLIANCE REPORT
## End-to-End Payment Security & Compliance Review
**Date:** November 11, 2026

---

### 1. Mandatory Security Controls Implemented

| Control | Implementation Detail | Status |
|---|---|:---:|
| **Server-Side Credentials** | Private API keys and secrets stored exclusively in server environment variables. Zero exposure in client bundles or public repositories. | **ENFORCED** |
| **HMAC-SHA256 Webhook Verification** | Verified against raw request body using constant-time comparison `crypto.timingSafeEqual`. | **ENFORCED** |
| **Replay Attack Defense** | Webhooks enforce a 300-second maximum timestamp window. Duplicate `event_id` entries are discarded transactionally. | **ENFORCED** |
| **Amount Tampering Defense** | Payment amount is calculated server-side from `invoices.outstanding_balance`. Client inputs are ignored. | **ENFORCED** |
| **SSRF Mitigation** | Gateway verifies destination IPs at send time using `SafeUrl` and pins connection via `CURLOPT_RESOLVE`. | **ENFORCED** |
| **Zero Banking Credentials Stored** | No UPI PINs, OTPs, debit card numbers, or CVVs are collected, processed, or persisted. | **ENFORCED** |
| **Direct-to-Merchant Settlement** | All customer payments settle directly into StarX Alpha Labs bank account; zero funds pooling or intermediate escrow. | **ENFORCED** |
| **Rate Limiting & Abuse Prevention** | Multi-tiered rate limiters on API key, IP address, and public checkout endpoints. | **ENFORCED** |
