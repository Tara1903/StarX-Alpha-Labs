# PHASE 11A — ARCHITECTURE REPORT
## UPI Gateway Architecture & Integration Design
**Date:** November 11, 2026

---

### 1. Dual-Ecosystem Architecture Overview

StarX Alpha Labs maintains a strict separation of concerns between client business management and payment execution:

```mermaid
graph TB
    subgraph ClientBrowser [Customer Client Browser]
        CP[Customer Portal /customer]
        CPAY[Hosted Checkout /pay/ORD...]
    end

    subgraph StarXPlatform [STARX ALPHA LABS — Vercel / Next.js 16 / Supabase]
        APP[Next.js App Router]
        FIN[Finance & Invoicing Engine]
        AUTH[Supabase Auth & RLS]
        APIPAY[/api/customer/payments/initiate]
        WHREC[/api/webhooks/upi-gateway]
        DB[(Supabase PostgreSQL)]
    end

    subgraph DedicatedGateway [UPI Gateway Service — Laravel 12 / PHP 8.2 / MySQL]
        API[API Router /api/v1/orders]
        ORD[Order Engine]
        OUTBOX[(Webhook Outbox)]
        QUEUE[Queue Worker & Scheduler]
        MDB[(MySQL 8.0+ Database)]
        VPG[Official Paytm / PhonePe PG APIs]
        MAN[Manual UTR Verification Desk]
    end

    %% Client flows
    CP -->|1. Request Payment Order| APIPAY
    APIPAY -->|2. Server-to-Server Auth X-Api-Key| API
    API -->|3. Issue Order & URL| APIPAY
    APIPAY -->|4. Return Payment URL| CP
    CP -->|5. Open Payment Page| CPAY

    %% Gateway processing
    CPAY -->|6. Initiate UPI Intent / QR| DedicatedGateway
    DedicatedGateway -->|7. Verify Status| VPG
    DedicatedGateway -->|8. Record Paid in DB Transaction| OUTBOX
    OUTBOX -->|9. Dispatch Job| QUEUE
    QUEUE -->|10. Signed POST HMAC-SHA256| WHREC

    %% StarX Fulfillment
    WHREC -->|11. Verify Sig, Deduplicate & Recalculate| FIN
    FIN -->|12. Update Invoice & Payment Record| DB
    DB -.->|13. Realtime Update| CP
```

---

### 2. Architectural Boundaries & Data Flow Guarantees
1. **Zero Browser Exposure:** Client browsers never communicate with the UPI Gateway API using merchant credentials. All order creation occurs via authenticated Next.js server endpoints (`/api/customer/payments/initiate`).
2. **Asynchronous Fulfillment:** Payment confirmation is strictly decoupled from the browser session. Even if the customer closes their browser immediately after making a UPI payment, the signed gateway webhook independently notifies StarX Alpha Labs and marks the invoice paid.
3. **Database Sovereignty:**
   - **Gateway Database:** MySQL 8.0+ maintains orders, merchants, payment accounts, daily limit tracking, outbox logs, and webhook delivery records.
   - **Company Database:** Supabase PostgreSQL maintains client organizations, invoices, milestone balances, contracts, and immutable audit logs.
   - Databases are never cross-connected or queried across systems directly; all data exchange occurs via JSON payloads over HTTPS.

---

### 3. High-Reliability Webhook Outbox Flow
The gateway's transactional outbox guarantees that an order status transition to `PAID` is atomically committed with the webhook outbox record:
```text
MySQL Transaction BEGIN
  UPDATE orders SET status = 'paid', paid_at = NOW(), utr = ? WHERE id = ?
  INSERT INTO webhook_outbox (event_id, order_id, sequence, event, payload, status)
MySQL Transaction COMMIT
```
The scheduled dispatcher (`php artisan webhooks:dispatch`) queries due outbox entries, acquires a distributed token lease, and publishes jobs to the Laravel queue. This ensures zero notification loss even during queue broker restarts or temporary network degradation.
