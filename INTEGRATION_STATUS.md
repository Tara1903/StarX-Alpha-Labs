# STARX ALPHA LABS — EXTERNAL INTEGRATION STATUS

**Last Updated:** November 17, 2026  
**Status Track:** Active Integration Verification  
**Branch:** `feat/portal-transformation`

---

## 1. Integration Matrix

| Integration | Protocol / Transport | Purpose | Configuration Status | Health Check | Runtime Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Google Stitch MCP** | stdio MCP & REST Bridge (`/api/design-studio/*`) | Design Studio AI Concept & Spec Generation | **CONNECTED & OPERATIONAL** | **PASS** | Direct MCP stdio + HTTP Bridge (`STITCH_MCP_URL`) + verified domain catalog fallback |
| **Supabase Database** | PostgreSQL / REST (`@supabase/supabase-js`) | Relational persistence, RLS, customer auth | **CONNECTED & RESILIENT** | **PASS** | Cloud Supabase + graceful local in-memory fallback |
| **UPI Payment Gateway** | Webhook / REST (`/api/webhooks/upi-gateway`) | Digital invoice payments & retainer settlements | **CONFIGURED** | **PASS** | Mock/sandbox test suite verified |
| **PDF Generation Engine** | Server-side HTML to PDF (`@/lib/pdfGenerator`) | Commercial Quotation & Proposal generation | **OPERATIONAL** | **PASS** | Generates verified StarX proposal PDFs |

---

## 2. Google Stitch Integration Specification

### 2.1 Capability Discovery
- **Provider:** Google Stitch MCP (`StitchMCP`)
- **Protocol:** `stitch-mcp/v1`
- **Supported AI Models:**
  - `GEMINI_3_8_FLASH` (Default, High-Fidelity Material You generation)
  - `GEMINI_3_5_FLASH_LITE` (Rapid iteration & wireframe matrices)
- **Supported Viewports:**
  - `DESKTOP` (1440 × 900)
  - `TABLET` (1024 × 768)
  - `MOBILE` (390 × 844)

### 2.2 Live MCP Tools Mapped
- `create_project`: Creates new design project scope in Google Cloud.
- `get_project`: Retrieves design themes, Material You tokens, and Design.md specifications.
- `list_projects`: Queries active design repositories.
- `generate_screen_from_text`: Prompts Gemini to synthesize multi-role screens.
- `download_file`: Streams signed Google Cloud screenshot thumbnails and raw HTML assets.
- `edit_screens`: Iterates upon screen components based on client revision feedback.

### 2.3 Architecture & Dual-Mode Execution
1. **Direct HTTP Bridge Mode:**
   - Active when `STITCH_MCP_URL` & `STITCH_API_KEY` are provided in the server environment.
   - Forwards client prompts directly to the external Stitch daemon.
2. **Verified Stitch Catalog & Antigravity MCP Mode:**
   - Live stdio tool integration available for Antigravity operators.
   - Backed by authenticated Stitch project snapshots across 8 domain archetypes with Google Cloud signed thumbnails and complete `Design.md` specifications.

---

## 3. Design Studio Verification
- [x] `GET /design-studio` returns HTTP 200 OK.
- [x] `POST /api/design-studio/projects` records structured brief.
- [x] `POST /api/design-studio/jobs` executes Stitch generation lifecycle.
- [x] `GET /api/design-studio/artifacts` returns Material You tokens and Design.md spec.
- [x] `POST /api/design-studio/revisions` logs versioned adjustment notes.
- [x] `PATCH /api/design-studio/revisions` approves design direction.
- [x] `POST /api/quote` locks approved direction and issues formal proposal reference.
