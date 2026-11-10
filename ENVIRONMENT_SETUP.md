# STARX ALPHA LABS — ENVIRONMENT SETUP GUIDE

## 1. Prerequisites
- **Node.js**: v20.x or higher (Tested on Node.js v26.4.0)
- **Package Manager**: npm v10+ or pnpm v9+
- **Git**: Installed and configured

---

## 2. Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local

# 3. Verify TypeScript types
npm run type-check

# 4. Run linting
npm run lint

# 5. Build for production (Turbopack)
npm run build

# 6. Start production server
npm run start
```

---

## 3. Environment Variables Reference

| Variable | Description | Exposure | Default / Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of StarX Alpha Labs | Client & Server | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API gateway | Client & Server | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous access key | Client & Server | `eyJhb...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Elevated server-only admin key | **Server Only** | `secret_...` |
| `NEXT_PUBLIC_STARX_FLOW_URL` | STARX FLOW ecosystem destination | Client & Server | `https://flow.starx.io` |
| `NEXT_PUBLIC_STARX_ECOSYSTEM_ENABLED` | Feature flag for ecosystem linkage | Client & Server | `true` |

> [!CAUTION]
> Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to any client-side bundle.

---

## 4. Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Generates the optimized production build using Turbopack.
- `npm run start`: Runs the built production server.
- `npm run type-check`: Executes strict TypeScript compilation verification (`tsc --noEmit`).
- `npm run lint`: Executes ESLint across `src/`.
