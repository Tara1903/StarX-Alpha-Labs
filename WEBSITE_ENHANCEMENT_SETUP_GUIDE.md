# STARX ALPHA LABS — PLATFORM ENHANCEMENT SETUP & OPERATIONS GUIDE
**Application:** https://starx-alpha-labs.vercel.app/  
**Company:** StarX Alpha Labs  
**Date:** November 11, 2026  

---

## 1. ENVIRONMENT VARIABLES CONFIGURATION

The enhanced platform utilizes the following environment variables:

```env
# Public Deployment URL
NEXT_PUBLIC_SITE_URL=https://starx-alpha-labs.vercel.app

# Decoupled Product Destinations
NEXT_PUBLIC_STARX_FLOW_URL=https://flow.starx.io

# Dedicated StarX Alpha Labs Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-labs-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Internal Admin Notifications (Configurable — Not Publicly Exposed)
ADMIN_NOTIFICATION_EMAIL=admin@starxalphalabs.io
```

> **Note on Company Email:** Public company email remains hidden on the frontend until officially supplied. The admin notification email is only used internally for server-side alert routing.

---

## 2. DATABASE MIGRATIONS

To apply the Video Station and Demo Requests database tables and RLS security policies:

```bash
# Push migration using Supabase CLI
npx supabase db push

# Or apply migration directly via Supabase SQL Editor:
# File: supabase/migrations/20261111000002_video_station_and_demo_requests.sql
```

The migration automatically creates:
- `public.video_categories`
- `public.videos`
- `public.demo_requests`
- `public.agency_partnerships`
- Configures RLS policies for public insertion and admin authority.

---

## 3. MANAGING VIDEO STATION SHOWCASES

1. Log in to the Super Admin Console at `/admin`.
2. Navigate to the **Video Station** tab.
3. Review video walkthroughs, durations, categories, and view metrics.
4. Video data and static seeds can be updated in `src/data/videos.ts`.

---

## 4. HANDLING PERSONALIZED DEMO REQUESTS

1. When a business submits the 12-field form on the homepage:
   - A unique Request ID is generated (`DEMO-XXXXX`).
   - The submission is recorded in `public.demo_requests`.
   - The user is provided with a one-click WhatsApp link prefilled with their project details.
2. The Super Admin can review all incoming requests under `/admin` -> **Personalized Demos** tab:
   - View client company name, city, industry, budget, and project details.
   - Click the green **WhatsApp** button to initiate an instant direct chat with the lead.
   - Update lead status from `PENDING` to `DEMO_BUILT` or `CONVERTED`.

---

## 5. LOCAL DEVELOPMENT & BUILD COMMANDS

```bash
# Install dependencies
npm install

# Run TypeScript type validation
npm run type-check

# Run production build
npm run build

# Start local server on custom port
npm run start -- -p 3000
```
