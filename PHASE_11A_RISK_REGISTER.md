# PHASE 11A — RISK REGISTER
## UPI Gateway Adoption & Integration Risk Log
**Date:** November 11, 2026

---

### Risk Classification Matrix

| Risk ID | Category | Description | Inherent Severity | Residual Severity | Mitigation & Control Strategy |
|---|---|---|:---:|:---:|---|
| **RSK-01** | Provider Security | Unofficial Paytm for Business web status scraping lacks cryptographic authentication, SLA, or stability guarantees. | **P1 (High)** | **P3 (Low)** | **Disable entirely.** Set `GATEWAY_ENABLE_PAYTM_BUSINESS=false`. Only official PG providers or manual UTR reconciliation permitted. |
| **RSK-02** | Network / Delivery | Webhook delivery may experience network drops or arrive out-of-order under high traffic. | **P1 (High)** | **P3 (Low)** | **Idempotent Webhook Receiver.** Deduplicate on `event_id` in database table `gateway_webhook_events`. Verify `event_sequence`. |
| **RSK-03** | Server Exposure | Incorrect document root setup on server hosting could expose `.env` or application source files. | **P0 (Critical)** | **P3 (Low)** | **Enforce `/public` Document Root.** Verify with deployment test routes (`deployment-private-check.txt` returns 403). Keep project outside web root. |
| **RSK-04** | Client Tampering | Client browser could attempt to submit modified invoice amounts or fabricate paid status redirects. | **P0 (Critical)** | **P3 (Low)** | **Zero Browser Trust.** StarX Alpha Labs backend validates order amount against invoice balance before calling Gateway API. Invoices marked paid ONLY on verified webhook. |
| **RSK-05** | Replay Attacks | An eavesdropped webhook request could be replayed by an adversary to falsify payment status. | **P1 (High)** | **P3 (Low)** | **HMAC-SHA256 & 5-minute Drift Window.** Compute signature with secret; reject any timestamp drifting > 300 seconds. Reject duplicate `event_id`. |
| **RSK-06** | Data Segregation | Sandbox test transactions could bleed into production financial accounting. | **P1 (High)** | **P3 (Low)** | **Strict Environment Isolation.** Separate API keys (`test_key_...` vs `key_...`), separate webhook secrets, and explicit `environment` flag on all transaction records. |
| **RSK-07** | Regulatory / Funds Pooling | Platform being misconstrued as an unauthorized payment aggregator or escrow service. | **P1 (High)** | **P3 (Low)** | **Direct-to-Merchant Architecture.** Funds settle directly from customer bank account to StarX Alpha Labs corporate bank account. Gateway never holds, escrows, or pools funds. |
