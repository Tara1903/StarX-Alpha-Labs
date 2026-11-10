# STARX ALPHA LABS — EXTERNAL ACTIONS & MIGRATION CHECKLIST
**Date:** November 10, 2026  
**Document Purpose:** Actions requiring external infrastructure, administrative console, DNS, legal, or third-party service access outside the local codebase.

---

## 1. COMPLETED REPOSITORY MIGRATIONS (INSIDE CODEBASE)

- [x] Full source code migration from `STARX LABS` to `StarX Alpha Labs`.
- [x] Primary wordmarks updated in `Navbar.tsx` and `Footer.tsx` (`STARX ALPHA LABS`).
- [x] Global baseline positioning integrated into `CompanyIntro.tsx` and `constants.ts`.
- [x] All 19 public and dynamic route page metadata, openGraph, and twitter cards updated.
- [x] Structured JSON-LD schema (Organization and WebSite) generated with `StarX Alpha Labs`.
- [x] Web App Manifest (`/manifest.webmanifest`) generated with `StarX Alpha Labs`.
- [x] `package.json` and `package-lock.json` updated to `starx-alpha-labs`.
- [x] Legal pages updated distinguishing brand identity from registered entity status.
- [x] Independent `STARX FLOW` product boundary strictly verified and protected.
- [x] TypeScript compiler (`0 errors`), ESLint (`0 warnings`), and Next.js build (`50/50 routes`) passing.

---

## 2. EXTERNAL ACTIONS REQUIRING ADMINISTRATIVE ACCESS

### A. GitHub Repository Configuration
1. **Repository Rename**:
   - [x] **COMPLETED**: Renamed from `Tara1903/StarX-Labs` to `Tara1903/StarX-Alpha-Labs`.
   - [x] **COMPLETED**: Remote origin URL updated to `https://github.com/Tara1903/StarX-Alpha-Labs.git`.
   - Verified live at: `https://github.com/Tara1903/StarX-Alpha-Labs`

### B. Custom Domain & DNS Migration
1. **Domain Registration**:
   - If migrating from `starxlabs.io` to a new primary domain (e.g. `starxalphalabs.io` or `starxalpha.io`):
     - Register domain with DNS registrar (e.g., Cloudflare, Namecheap, Google Domains).
     - Configure DNS A/CNAME records pointing to hosting platform (Vercel / Cloudflare Pages / AWS).
2. **Production URL Environment Variable**:
   - Update `NEXT_PUBLIC_SITE_URL` in production hosting dashboard (e.g., Vercel Project Settings -> Environment Variables) to the new canonical domain.
   - Configure a 301 permanent redirect from old domain (`starxlabs.io`) to new domain to preserve SEO link equity.

### C. Cloud Hosting & Supabase Management
1. **Hosting Project Name**:
   - In Vercel / Cloudflare / Netlify dashboard, rename project from `starx-labs` to `starx-alpha-labs`.
2. **Supabase Cloud Project**:
   - In Supabase Management Console (`app.supabase.com`), update project display name to **StarX Alpha Labs**. (Note: Do not alter project URL or API keys, as they are independent database identifiers).

### D. Corporate Registration & Legal Entity
1. **Official Trademark & Business Filing**:
   - File trademark application for "StarX Alpha Labs" and "StarX Alpha" under software and technology classifications.
   - Execute formal company registration with relevant corporate registry authorities (CIN / Incorporation).
   - Once formal incorporation documents are finalized, update `legalName` and registered office address in `src/lib/constants.ts` with the official legal entity suffix (e.g., Ltd., LLC, Inc.).

### E. Social Profiles, Email & External Accounts
1. **Corporate Email Inboxes**:
   - Provision `contact@starxalphalabs.io` and `solutions@starxalphalabs.io` on Google Workspace or chosen email host.
   - Configure MX records and email forwarding from legacy addresses.
2. **Social Media & Developer Handles**:
   - Update X / Twitter, LinkedIn, GitHub Organization, and YouTube channel titles to **StarX Alpha Labs**.
