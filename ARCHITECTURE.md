# STARX LABS — SYSTEM ARCHITECTURE SPECIFICATION

## 1. System Overview
STARX LABS is built as a premier, high-performance web platform combining cinematic visual computing with scalable enterprise software architecture.

---

## 2. Technology Stack

- **Framework**: Next.js 16.4.6 (App Router, Turbopack engine)
- **UI Runtime**: React 19.0.0 & React-DOM 19.0.0
- **Language**: TypeScript 5.8 (Strict Mode enabled)
- **Styling**: Tailwind CSS v4.0.9 via `@tailwindcss/postcss`
- **3D & Graphics**: Three.js 0.187.0, `@react-three/fiber` 9.8.2, `@react-three/drei` 10.7.9
- **Motion**: `motion` 12.4.7 (hardware-accelerated Framer Motion successor)
- **Database & Auth**: Supabase (`@supabase/supabase-js` 2.49.1, `@supabase/ssr` 0.12.7)
- **Form & Validation**: React Hook Form 7.54.2 + `@hookform/resolvers` + Zod 3.24.2
- **Icons**: Lucide React 1.71.0

---

## 3. Directory Layout

```
src/
├── app/                        # Next.js App Router root
│   ├── api/                    # API endpoints
│   │   └── health/route.ts     # Health verification endpoint
│   ├── globals.css             # Tailwind v4 theme & CSS root
│   ├── layout.tsx              # Root HTML & metadata layout
│   └── page.tsx                # Homepage entry point
├── components/                 # Reusable components
│   ├── 3d/                     # Isolated Three.js/R3F scenes
│   ├── layout/                 # Navigation, footer, shell
│   └── ui/                     # Design system atoms and molecules
├── lib/                        # Core utilities & services
│   ├── supabase/               # Multi-context Supabase clients
│   │   ├── admin.ts            # Server-only service-role client
│   │   ├── client.ts           # Browser client
│   │   ├── middleware.ts       # Session management helper
│   │   └── server.ts           # Server component cookie-based client
│   ├── constants.ts            # Site configuration & brand definitions
│   └── utils.ts                # Styling & formatting utilities
├── proxy.ts                    # Next.js 16 request proxy/session handler
└── types/                      # Application & database type definitions
    └── database.types.ts       # Supabase typed schema interfaces
```

---

## 4. Key Architectural Boundaries

### 4.1 Server Component vs. Client Component
- **Default Execution**: All pages and layout components remain Server Components (`RSC`).
- **Client Boundaries**: Explicit `'use client'` pragmas are reserved for interactive forms, motion interactions, and 3D canvas viewers.

### 4.2 WebGL Component Boundary
- Interactive 3D scenes are completely isolated behind dynamic imports with SSR disabled (`ssr: false`).
- A static CSS/SVG fallback renders instantly to ensure primary text and call-to-actions are never blocked by WebGL initialization.

### 4.3 Supabase SSR Architecture
- **Browser Client (`client.ts`)**: Uses standard public keys for authenticated interactive requests.
- **Server Client (`server.ts`)**: Reads cookies asynchronously (`await cookies()`) for server-side auth checking and pre-rendering.
- **Proxy/Middleware (`proxy.ts`)**: Refreshes expired sessions on active navigation without impeding static asset delivery.
- **Admin Client (`admin.ts`)**: Server-only client with `SUPABASE_SERVICE_ROLE_KEY` used solely within secured server actions and API handlers.

### 4.4 STARX Ecosystem Boundary
- **STARX LABS** owns software engineering, bespoke platforms, digital solutions, and high-end agency consulting.
- **STARX FLOW** owns general-purpose business automation, CRM, AI receptionist, and omnichannel workflows.
- Boundary is bridged solely via configurable external destination links and referral attribution tokens.
