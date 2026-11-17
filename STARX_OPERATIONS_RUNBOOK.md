# STARX ALPHA LABS — PLATFORM OPERATIONS RUNBOOK
## Production Operations, Maintenance & Engineering Protocols

**Last Updated:** November 17, 2026  
**System Version:** 2.0.0 (Master Platform Transformation)  
**Target Environment:** Vercel Edge / Cloudflare / Supabase PostgreSQL  

---

### 1. Architectural Architecture & Ecosystem Map

- **Public Web Portal:** Next.js 16.4.6 App Router, React 19, TypeScript, Tailwind CSS v4, Motion.
- **Design Studio Engine:** Google Stitch MCP protocol using `gemini-3.8-flash` via Direct Stdio or HTTP Bridge.
- **Database & Storage:** Supabase PostgreSQL with Row Level Security and private `design-studio-artifacts` storage bucket.
- **StarX Flow AI OS:** Hosted independently with secure cross-origin referral parameter passing.
- **StarX Forge:** Internal automated generation engine accessible strictly via authenticated Admin Console (`/admin/forge`).

---

### 2. Operational Procedures & Runbooks

#### A. Verifying Platform Health
Run the automated test suite locally or in CI/CD:
```bash
# Run Master Platform Integration & Regression Tests (51 checks)
node scripts/test-master-platform-integration.mjs

# Run Authentic Google Stitch MCP Personalized Demo Tests (6 checks)
node scripts/test-design-studio-personalized-demo.mjs

# Run Full Production Build & Type-Check
npm run type-check
npm run build
```

#### B. Managing Google Stitch MCP Worker & API Keys
1. **API Key Configuration:**
   - Ensure `STITCH_API_KEY` is configured in production environment variables (Vercel / Hosting Provider).
2. **Transient Error Handling:**
   - The direct provider includes an automated 3.5-second retry loop for upstream 502/503 errors from Google's servers.
3. **Stand-alone Worker Daemon:**
   - In persistent worker environments (e.g. Railway / Docker), launch the queue consumer:
     ```bash
     npm run stitch:worker
     ```

#### C. Database Migration & Schema Sync
When applying new PostgreSQL migrations to Supabase:
1. Review `supabase/migrations/20261117000001_design_studio_ecosystem.sql` and `20261117000002_master_platform_architecture.sql`.
2. Apply using Supabase Dashboard SQL Editor or Supabase CLI:
   ```bash
   npx supabase db push
   ```
3. Dual-Persistence Fallback:
   - If PostgreSQL tables are temporarily uninitialized, the application falls back safely to in-memory runtime caches and `quote_requests` metadata storage without interrupting user journeys.

#### D. Monitoring & Audit Logs
- Customer enquiries and quotation handoffs are logged in `/admin` under **CRM** and **Demo Requests**.
- System-wide security events and administrative actions are logged in the `audit_events` table.

---

### 3. Emergency Incident Response & Rollback

- **Recovery Git Tag:** `backup-pre-master-transformation-20261117` at commit `4b40198`.
- If an emergency rollback is required:
  ```bash
  git checkout backup-pre-master-transformation-20261117
  npm run build
  ```
