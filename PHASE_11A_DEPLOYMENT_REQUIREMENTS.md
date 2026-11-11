# PHASE 11A — DEPLOYMENT REQUIREMENTS
## Standalone Production Hosting Specification for UPI Gateway
**Target Subdomain:** `payments.starx-alpha-labs.com` (or authorized company payment subdomain)  
**Date:** November 11, 2026

---

### 1. Hardware & System Prerequisites
- **Operating System:** Ubuntu 22.04 LTS / 24.04 LTS or certified enterprise Linux.
- **CPU / RAM:** Minimum 2 vCPU, 2 GB RAM (4 GB recommended for high concurrent checkout loads).
- **Storage:** 20 GB NVMe SSD with automated nightly snapshot backups.

---

### 2. Runtime & Service Stack
- **Web Server:** Nginx 1.24+ (with HTTP/2 and modern TLS 1.2/1.3 ciphers).
- **PHP Runtime:** PHP 8.2 or PHP 8.3 FPM.
  - Required Extensions: `php8.2-fpm`, `php8.2-mysql`, `php8.2-curl`, `php8.2-mbstring`, `php8.2-xml`, `php8.2-bcmath`, `php8.2-zip`, `php8.2-intl`, `php8.2-fileinfo`.
- **Database Server:** MySQL 8.0+ or MariaDB 10.11+ (InnoDB storage engine, `utf8mb4_unicode_ci`).
- **Process Manager:** `systemd` or `supervisor` for continuous background queue processing.
- **Cron Scheduler:** Native system cron executing `php artisan schedule:run` every minute.

---

### 3. Web Server & Document Root Hardening (Mandatory)
The web server **MUST** point its root directive strictly to the application's `/public` folder:

```nginx
server {
    listen 443 ssl http2;
    server_name payments.starx-alpha-labs.com;
    root /var/www/upi-gateway/public;

    index index.php;

    # TLS Certificates
    ssl_certificate /etc/letsencrypt/live/payments.starx-alpha-labs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/payments.starx-alpha-labs.com/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Block access to hidden files and private directories
    location ~ /\.(?!well-known).* {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Deny direct execution or access to non-public files
    location ~ \.(env|git|lock|yml|yaml|json|txt|md|sql)$ {
        deny all;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_hide_header X-Powered-By;
    }
}
```

---

### 4. Background Workers & Daemons (`supervisor`)

#### A. Laravel Queue Worker (`/etc/supervisor/conf.d/upi-worker.conf`)
```ini
[program:upi-worker]
process_name=%(program_name)s_%(process_num)02d
command=/usr/bin/php /var/www/upi-gateway/artisan queue:work database --sleep=3 --tries=6 --timeout=60 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/upi-gateway/storage/logs/worker.log
```

#### B. Laravel Scheduler (Cron)
```cron
* * * * * cd /var/www/upi-gateway && /usr/bin/php artisan schedule:run >> /var/www/upi-gateway/storage/logs/scheduler.log 2>&1
```

---

### 5. Production Environment Variables (`.env`)
```ini
APP_NAME="StarX UPI Gateway"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://payments.starx-alpha-labs.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=starx_upi_gateway
DB_USERNAME=starx_gateway_user
DB_PASSWORD=<SECURE_GENERATED_MYSQL_PASSWORD>

SESSION_DRIVER=database
SESSION_ENCRYPT=true
QUEUE_CONNECTION=database
CACHE_STORE=database

ALLOW_REGISTRATION=false
GATEWAY_ENABLE_PAYTM_BUSINESS=false
```
