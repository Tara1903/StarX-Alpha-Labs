# STARX ALPHA LABS — PHASE 7 OPERATIONS GUIDE
## Production Operations, Monitoring & Runbook

**Date**: November 11, 2026  
**Audience**: DevOps, Engineering Leads, On-Call Architects  
**Project**: StarX Alpha Labs  
**Production URL**: `https://starx-alpha-labs.vercel.app/`  
**Repository**: `https://github.com/Tara1903/StarX-Alpha-Labs.git`

---

### 1. Operations Overview
This guide defines standard operating procedures for maintaining the StarX Alpha Labs platform in production. It covers configuration management, continuous deployment, health monitoring, lead processing workflows, and incident response.

---

### 2. Production Environment Variables Reference

The application requires the following environment variables in the Vercel Production Environment:

| Variable Name | Required | Scope | Purpose | Example / Format |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Yes | Client & Server | Canonical public origin URL | `https://starx-alpha-labs.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Client & Server | Supabase project REST URL | `https://[project-ref].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Client & Server | Public anonymous API key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server Only | Privileged database access key | `eyJhbGciOi...` (NEVER prefix with `NEXT_PUBLIC_`) |
| `ADMIN_NOTIFICATION_EMAIL` | Optional | Server Only | Target inbox for new lead notifications | `admin@domain.com` (Fallback gracefully if unset) |
| `RESEND_API_KEY` | Optional | Server Only | Email dispatch service key | `re_123456789...` (Optional transactional mail) |

> [!NOTE]
> All lead capture endpoints (`/api/demo-request`, `/api/agency-enquiry`, `/api/quote`) include in-memory and local file logging fallbacks. If Supabase environment variables are temporarily unset, visitor submissions will still return success and prefill WhatsApp dispatch links without failing.

---

### 3. Continuous Deployment (CI/CD) Workflow
The platform is deployed via Vercel’s native GitHub integration connected to the `main` branch:

1. **Local Development & Validation**:
   ```bash
   npm run type-check   # Must exit with code 0
   npm run build        # Must compile all 426 routes
   ```
2. **Git Commit & Push**:
   ```bash
   git add -A
   git commit -m "feat/fix: descriptive message"
   git push origin main
   ```
3. **Automated Vercel Deployment**:
   - Vercel triggers a production build automatically on push to `main`.
   - Turbopack compiles static assets and Edge routes in ~45 seconds.
   - Atomic deployment alias switches to `https://starx-alpha-labs.vercel.app/` only upon successful build verification. Zero downtime.

---

### 4. Health Monitoring & Observability

#### Public Health Endpoint
The platform exposes an automated health check at:
`GET https://starx-alpha-labs.vercel.app/api/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2026-11-11T09:15:00.000Z",
  "version": "1.0.0",
  "uptime": 12845.2,
  "environment": "production"
}
```

#### Monitoring Checklist
1. **HTTP Status**: Verify `200 OK` on `/`, `/demos`, `/video-station`, and `/agency-partnership`.
2. **Response Times**: Global TTFB should remain under 150ms on Vercel Edge.
3. **Core Web Vitals**: Largest Contentful Paint (LCP) < 2.0s; First Input Delay (FID) < 100ms; Cumulative Layout Shift (CLS) < 0.05.
4. **WebGL Canvas**: Verify Three.js 3D hardware scene initializes and renders at 60 FPS across desktop and mobile.

---

### 5. Lead Processing & Inquiries Runbook

#### A. Personalized Demo Requests (`/api/demo-request`)
- **Submission Source**: Homepage "Free Personalized Demo" section.
- **Data Payload**: Business name, industry category, key goals, target timeline, contact info, request ID (`DEMO-XXXXX`).
- **Immediate Action**: The visitor is immediately provided a one-click button that opens WhatsApp (`+91 9660937033`) with a prefilled message containing their request ID and requirements.
- **Operator Follow-Up**:
  1. Access Supabase table `demo_requests` or check WhatsApp notifications.
  2. Review client's selected demo models from the 160+ catalog.
  3. Prepare customized preview link and send within 24 hours.

#### B. Agency Partnership Applications (`/api/agency-enquiry`)
- **Submission Source**: `/agency-partnership` portal.
- **Data Payload**: Agency name, monthly project volume, primary services, partnership tier, contact person, request ID (`AGY-XXXXX`).
- **Operator Follow-Up**:
  1. Review agency portfolio and client volume.
  2. Dispatch white-label partnership agreement and schedule intro call.

---

### 6. Incident Response & Escalation Protocol

| Severity | Definition | Response SLA | Action Protocol |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Production site down (5xx errors across origin), DNS failure, or critical security breach. | < 15 minutes | 1. Rollback immediately to previous deployment alias in Vercel.<br>2. Notify Tech Lead Hari Singh (+91 9660937033).<br>3. Inspect Vercel deployment logs and edge function metrics. |
| **SEV-2 (Major)** | Lead forms failing, 3D WebGL crashes on supported browsers, or Video Station embeds broken. | < 1 hour | 1. Verify API endpoint status in `/api/health`.<br>2. Check Supabase connection quota and API keys.<br>3. Deploy hotfix to `main`. |
| **SEV-3 (Minor)** | Minor visual alignment, typography correction, or content update request. | < 24 hours | Standard PR workflow with full build test before merging. |

---

### 7. Emergency Contacts
- **Founder & Technical Lead**: Hari Singh
- **Phone / WhatsApp**: +91 9660937033 (`https://wa.me/919660937033`)
- **Headquarters**: Shop No. 6, Giriraj Villa, Near Tapti Parisar, Indore, Madhya Pradesh, India
