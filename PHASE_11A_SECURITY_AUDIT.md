# PHASE 11A — SECURITY AUDIT REPORT
## UPI Gateway Security Review & Vulnerability Assessment
**Repository:** `https://github.com/mynkdev-21/upi-gateway`  
**Date:** November 11, 2026  
**Auditors:** Application Security & Cryptographic Review Desk

---

### 1. Cryptographic Controls & Key Management
- **API Authentication (`AuthenticateApiKey`):**
  Uses `hash_equals($expectedSecret, $secret)` for secret comparison. This provides constant-time verification, entirely preventing side-channel timing attacks.
- **Webhook Signatures (`WebhookSignature`):**
  - Webhooks are signed using HMAC-SHA256 (`hash_hmac('sha256', "{$timestamp}.{$body}", $secret)`).
  - The signature header format is `t=<timestamp>,v1=<signature>`.
  - Signature parsing (`parseHeader`) strictly rejects empty pairs, duplicate keys, malformed segments, and extra delimiters.
  - Replay protection enforces a strict 300-second (5-minute) drift tolerance (`abs($currentTime - $timestamp) > 300`).
- **Session Encryption at Rest:**
  Database sessions are encrypted via AES-256-CBC with zero-downtime key rotation support via `APP_PREVIOUS_KEYS`.

---

### 2. SSRF (Server-Side Request Forgery) Defense in Webhook Delivery
When sending webhooks to merchant URLs, malicious merchants could input internal network URLs (e.g. `http://169.254.169.254/latest/meta-data/` or internal VPC microservices).
- **Audit Findings:** The gateway implements 4-layer defense via `App\Support\SafeUrl` and `App\Jobs\SendWebhook`:
  1. **Strict Protocol & IP Validation:** Rejects non-HTTPS schemes, private RFC 1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback (`127.0.0.1`), link-local (`169.254.0.0/16`), IPv6 link-local, and broadcast addresses.
  2. **DNS Rebinding Protection:** The destination hostname is resolved at dispatch time and pinned directly into curl using `CURLOPT_RESOLVE` (`hostname:port:ip`). Curl cannot re-resolve the hostname mid-connection to an internal IP.
  3. **Redirect Denial:** `withoutRedirecting()` is enforced. A merchant webhook cannot return an HTTP 301/302 pointing to an internal server.
  4. **Zero Body Persistence:** Only the HTTP status code (or a short error token) is logged; response bodies from external webhook endpoints are never saved into database logs, preventing stored XSS or data exfiltration.

---

### 3. Rate Limiting & Abuse Prevention
- **Failed API Authentication Rate Limiting:** Enforces an IP-level bucket (`api-failed-auth:IP`) allowing max 30 failed attempts per 60 seconds before issuing HTTP 429 Too Many Requests.
- **Per-Key Rate Limiting:** 120 requests/minute for status queries; 1,000 requests/minute for order creation.
- **Per-IP Global Rate Limiting:** 600 requests/minute per IP address.
- **Public Checkout Throttling:**
  - Status polling: 40 requests/min.
  - UTR submission: 10 requests/min.
  - Sandbox simulation: 20 requests/min.
  - Payment initiation: 20 requests/min.

---

### 4. Input Validation & Injection Resistance
- **Amount Tampering:** Strict decimal validation (`numeric`, `min:1`, `max:100000`, `decimal:0,2`). Orders cannot be created with negative amounts, fractional sub-cents, or overflow integers.
- **SQL Injection:** Full ORM parameterization across Eloquent and query builders. Raw SQL queries are absent across user input handling.
- **Redirect URL Validation:** Open redirect vulnerability is prevented by enforcing domain allowlisting (`merchant->allowedRedirectDomains()`). Only approved merchant root domains can receive browser redirects.

---

### 5. Identified Security Findings & Mandated Remediation

| Ref | Finding | Severity | Status | Mandated StarX Alpha Labs Action |
|---|---|:---:|:---:|---|
| **SEC-01** | Paytm for Business web polling lacks cryptographic signatures and SLA | High / P1 | Known Risk | **SET `GATEWAY_ENABLE_PAYTM_BUSINESS=false`** in production `.env`. |
| **SEC-02** | Webhook replay window (300 seconds) allows replay without consumer deduplication | Medium / P2 | Architecture Inherent | **Implement database unique constraint on `event_id`** in StarX Alpha Labs webhook receiver. |
| **SEC-03** | Public document root misconfiguration could expose `.env` on unhardened hosting | High / P1 | Deployment Dependent | **Enforce Nginx / Apache document root strictly to `/public`**. Verify sentinel file `deployment-private-check.txt` returns HTTP 403. |
| **SEC-04** | Direct merchant registration enabled if `ALLOW_REGISTRATION=true` | Medium / P2 | Configuration | **Keep `ALLOW_REGISTRATION=false`**; merchant accounts provisioned strictly by platform administrator. |
