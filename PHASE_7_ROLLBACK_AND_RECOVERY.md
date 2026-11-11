# STARX ALPHA LABS — PHASE 7 ROLLBACK & RECOVERY
## Production Rollback Procedures & Disaster Recovery Runbook

**Date**: November 11, 2026  
**Audience**: DevOps, Incident Commanders, Engineering Leads  
**Project**: StarX Alpha Labs  
**Production Domain**: `https://starx-alpha-labs.vercel.app/`  
**Repository**: `https://github.com/Tara1903/StarX-Alpha-Labs.git`

---

### 1. Rollback Philosophy & Objectives
Production deployments of StarX Alpha Labs are immutable and atomic. Because Vercel retains historical deployment artifacts indefinitely, any bad build, runtime crash, or severe regression can be rolled back instantaneously with **zero build time** and **zero downtime**.

- **Recovery Time Objective (RTO)**: **< 60 seconds** (Instantaneous deployment alias swap).
- **Recovery Point Objective (RPO)**: **0 data loss** for code changes; zero destructive database operations permitted.

---

### 2. Immediate Production Rollback Procedures

#### Option A: Vercel Web Dashboard (Fastest — Under 30 seconds)
1. Navigate to: [https://vercel.com/tara1903s-projects/starx-alpha-labs/deployments](https://vercel.com/tara1903s-projects/starx-alpha-labs/deployments)
2. Locate the most recent **Known-Good Deployment** in the deployment list.
3. Click the three dots menu (`...`) on that deployment and select **"Assign to Domain"** or click **"Rollback"**.
4. Confirm target domain: `starx-alpha-labs.vercel.app`.
5. The edge routing table switches traffic immediately. The previous version becomes live across all edge POPs in milliseconds.

#### Option B: Vercel CLI (Command Line)
Execute from any terminal authenticated with the Vercel account:
```bash
# Instant rollback to previous production deployment
vercel rollback --yes

# Or target a specific deployment URL directly
vercel alias set [known-good-deployment-url].vercel.app starx-alpha-labs.vercel.app
```

#### Option C: Git Revert (Clean Branch History)
If a rollback needs to be formalized in Git:
```bash
# 1. Ensure you are on main and up to date
git checkout main
git pull origin main

# 2. Revert the problematic commit
git revert HEAD --no-edit

# 3. Push revert to GitHub (triggers automated Vercel production build)
git push origin main
```

---

### 3. Historical Known-Good Deployments Matrix

| Commit Hash | Tag / Description | Build Status | Verification |
| :--- | :--- | :--- | :--- |
| `HEAD` (Phase 7) | Production readiness, security headers, launch hardening | **SUCCESS** | Verified on Vercel Edge (`bom1`) |
| `db39f48` | Prominent STARX FLOW AI OS navbar badge & direct link | **SUCCESS** | Clean Turbopack compilation |
| `79a3d9d` | 3D centerpiece realism, Video Station, Free Personalized Demo, Business Identity single source | **SUCCESS** | Live verified on Vercel |
| `b21d319` | Phase 6 Ecosystem integration, centralized product registry | **SUCCESS** | Deployed & tested |
| `221a48a` | STARX FLOW SaaS cockpit section restoration | **SUCCESS** | Verified |

---

### 4. Database Rollback & Forward-Fix Policy
StarX Alpha Labs enforces a **forward-fix database migration policy**:

1. **No Destructive Drops**: Tables, columns, or enum types must never be dropped in production migrations.
2. **Backward Compatibility**: Code changes must always support the previous version of the database schema (expand and contract pattern).
3. **Additive Schema Updates**: If a new column is required (e.g. `lead_score` in `demo_requests`), it must be declared `NULLABLE` or provided a `DEFAULT` value so older code does not fail upon rollback.
4. **Data Restoration**:
   - Supabase automated point-in-time recovery (PITR) is accessible from the Supabase Project Dashboard under *Database -> Backups*.
   - In case of corrupt records, execute targeted SQL scripts rather than rolling back the entire database instance.

---

### 5. Post-Rollback Verification Checklist
Immediately after executing any rollback:
- [ ] Send `GET` request to `https://starx-alpha-labs.vercel.app/api/health` and verify `200 OK`.
- [ ] Open homepage in browser with cache bypassed (`Ctrl + Shift + R`) and confirm hero renders cleanly.
- [ ] Submit a test demo request in the Personalized Demo section and verify `DEMO-XXXXX` prefilled WhatsApp link.
- [ ] Check Vercel Functions log stream for any 500 exceptions.
- [ ] Notify team in communications channel with details of the rollback and root cause investigation plan.
