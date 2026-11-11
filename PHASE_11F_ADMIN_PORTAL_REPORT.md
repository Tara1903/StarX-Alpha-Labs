# PHASE 11F — ADMIN PORTAL REPORT
## Super Admin Portal Gateway Management
**Route:** `/admin` -> `Commercial -> Payment Gateway`  
**Date:** November 11, 2026

---

### 1. Administrative Capabilities
The Super Admin Portal features a dedicated **Payment Gateway** management command center:
1. **Real-time Status Banner:**
   - Displays gateway endpoint (`https://payments.starx-alpha-labs.com`).
   - Active mode pill (`SANDBOX` / `LIVE`).
   - Diagnostic Probe tool (`Test Connectivity` button).
2. **Gateway Metrics:**
   - Total Collected Online Volume (₹).
   - Count of Successful Payments.
   - Count of In-flight Pending Orders.
   - Verified Webhook Events counter.
3. **Gateway Transactions Ledger:**
   - Displays Gateway Order ID (`ORD...`), linked Invoice #, Client Organization Name, Amount, Status badge, UTR reference, and hosted checkout link.
4. **Cryptographic Webhooks Stream:**
   - Live audit stream of incoming webhooks.
   - Event ID, Event Type (`order.paid`, `order.expired`), Signature Verification status (`HMAC-SHA256 Valid`), Order number, Received timestamp, and Processed state.

---

### 2. Security Boundaries
- Only users with `role = 'owner'` or `role = 'admin'` can access the Payment Gateway tab.
- API keys and secrets are never returned in full in API responses or displayed in cleartext in the dashboard.
