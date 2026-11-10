# STARX ALPHA LABS — PHASE 5 SETUP & RUNBOOK GUIDE
## Dedicated Backend, Supabase Infrastructure & Administration Guide
**Target System**: StarX Alpha Labs  
**Date**: November 10, 2026

---

### 1. Environment Configuration

Create or update `.env.local` using the template below. Ensure these variables point to your **dedicated StarX Alpha Labs Supabase project** (never STARX FLOW).

```env
# Application Host URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Dedicated StarX Alpha Labs Supabase Infrastructure
NEXT_PUBLIC_SUPABASE_URL=https://<your-starx-alpha-labs-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-starx-alpha-labs-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-starx-alpha-labs-service-role-secret-key>

# One-time Initial Owner Bootstrap Secret (Generate with: openssl rand -hex 32)
STARX_BOOTSTRAP_SECRET=<your-high-entropy-bootstrap-secret>

# Ecosystem Links (Optional)
NEXT_PUBLIC_STARX_FLOW_URL=https://flow.starx.io
NEXT_PUBLIC_STARX_ECOSYSTEM_ENABLED=true
```

---

### 2. Database Migrations Execution

Apply the declarative schema to your dedicated Supabase project using the Supabase CLI:

```bash
# Link to your dedicated StarX Alpha Labs Supabase project
supabase link --project-ref <your-project-ref>

# Apply the Phase 5 core database migration
supabase db push
```

Alternatively, copy the SQL contents of:
`supabase/migrations/20261110000001_phase5_core_schema.sql`
and run it in the Supabase SQL Editor.

---

### 3. Content Seeding

Populate initial services, divisions, industries, portfolio projects, and technical blog posts using either:

#### Option A: Node.js Automated Seeding Script
```bash
node scripts/seed-cms-content.js
```

#### Option B: SQL Editor Seeding
Execute `supabase/seed.sql` inside the Supabase SQL Editor. It uses idempotent `INSERT ... ON CONFLICT (slug) DO UPDATE` statements.

---

### 4. Initial Owner Bootstrap

To provision the initial root `owner` account:

```bash
curl -X POST http://localhost:3000/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-bootstrap-secret: <STARX_BOOTSTRAP_SECRET>" \
  -d '{
    "email": "director@starxalphalabs.com",
    "password": "<secure-password>",
    "fullName": "Executive Director"
  }'
```

**Security Guard**: This endpoint will only execute if NO owner currently exists. Subsequent attempts return HTTP 409 Conflict.

---

### 5. Running the Security Test Suite

Run the automated security test suite to verify that your instance satisfies all boundary and access control checks:

```bash
# Ensure the local server is running on port 3000
npm run start -- -p 3000

# Run the test suite
node scripts/test-phase5-security.js
```

All 16 tests must return `[✅ PASS]`.

---

### 6. Administrative Sign-In

1. Navigate to `http://localhost:3000/admin/login`.
2. Sign in with the credentials provisioned during bootstrap.
3. Access the administrative management center at `http://localhost:3000/admin`.
