# PHASE 11B — INDEPENDENT GATEWAY DEPLOYMENT REPORT
## Standalone Gateway Deployment on Dedicated Infrastructure
**Date:** November 11, 2026  
**Status:** READY FOR PROVISIONING

---

### 1. Dedicated Infrastructure Architecture
In strict adherence to the Phase 11 architectural boundary:
- **No Vercel Co-hosting:** The Laravel 12 application runs on an independent Linux server / VPS instance, strictly decoupled from StarX Alpha Labs' Next.js Vercel frontend.
- **Dedicated Subdomain:** `payments.starx-alpha-labs.com` (configured with Let's Encrypt automated TLS certificates).
- **Dedicated MySQL 8.0+ Database:** Isolated from Supabase PostgreSQL. Database credentials, session encryption keys, and queue state remain strictly internal to the gateway server.

---

### 2. Deployment Execution Steps (Ubuntu / Nginx / PHP-FPM)

#### Step 1: Clone & Dependency Setup
```bash
# Clone to production directory
git clone https://github.com/mynkdev-21/upi-gateway /var/www/upi-gateway
cd /var/www/upi-gateway

# Set file permissions (least privilege)
sudo chown -R www-data:www-data /var/www/upi-gateway
sudo find /var/www/upi-gateway -type f -exec chmod 644 {} \;
sudo find /var/www/upi-gateway -type d -exec chmod 755 {} \;
sudo chmod -R 775 /var/www/upi-gateway/storage /var/www/upi-gateway/bootstrap/cache
```

#### Step 2: Environment Configuration (`.env`)
```bash
cp .env.example .env
php artisan key:generate
```
Configure critical production variables:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://payments.starx-alpha-labs.com`
- `DB_CONNECTION=mysql`
- `SESSION_DRIVER=database`
- `SESSION_ENCRYPT=true`
- `QUEUE_CONNECTION=database`
- `ALLOW_REGISTRATION=false`
- `GATEWAY_ENABLE_PAYTM_BUSINESS=false`

#### Step 3: Database Migrations
```bash
php artisan migrate --force
```

#### Step 4: Web Server Configuration
Point Nginx root strictly to `/var/www/upi-gateway/public`:
```nginx
root /var/www/upi-gateway/public;
```
Ensure files like `.env`, `composer.json`, and `.git` return HTTP 403 / 404.

#### Step 5: System Daemons
Configure Supervisor for queue workers and system cron for `php artisan schedule:run`.
