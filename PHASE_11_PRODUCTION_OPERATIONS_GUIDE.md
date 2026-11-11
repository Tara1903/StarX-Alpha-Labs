# PHASE 11 — PRODUCTION OPERATIONS GUIDE
## UPI Gateway Operational Runbook & Maintenance Manual
**Date:** November 11, 2026

---

### 1. Daily Operations & Monitoring
- **Supervisor Daemons:** Ensure queue workers are active:
  ```bash
  sudo supervisorctl status upi-worker:*
  ```
- **Scheduler Logs:** Verify cron execution:
  ```bash
  tail -f /var/www/upi-gateway/storage/logs/scheduler.log
  ```
- **Webhook Delivery Health:** In the Super Admin Portal (`/admin -> Commercial -> Payment Gateway`), review the **Signed Webhooks Audit Stream** for pending or failed deliveries.

---

### 2. Manual Webhook Retry Procedures
If a network outage temporarily prevents webhook delivery to StarX Alpha Labs:
1. SSH into the gateway server:
   ```bash
   cd /var/www/upi-gateway
   php artisan webhooks:dispatch
   ```
2. To retry an individual failed event:
   ```bash
   php artisan webhooks:retry <event-uuid>
   ```

---

### 3. Key Rotation Procedures
When rotating webhook signing secrets or API keys:
1. In the Gateway Dashboard (`/settings`), click **Regenerate Webhook Secret**.
2. Copy the new secret and update Vercel environment variable `UPI_GATEWAY_WEBHOOK_SECRET`.
3. Redeploy the Next.js application on Vercel to load the new secret.
