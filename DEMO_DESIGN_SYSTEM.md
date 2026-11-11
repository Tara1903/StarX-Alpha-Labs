# STARX ALPHA LABS — DEMO CENTER
## DEMO DESIGN SYSTEM & VISUAL IDENTITY CONTRACT
**Document Reference:** `DEMO_DESIGN_SYSTEM.md`  
**Date:** November 11, 2026  
**Auditor:** Visual Design Director & Principal UI Architect  
**Target Platform:** STARX ALPHA LABS (`https://www.starxalphalabs.online`)  

---

## 1. VISUAL DESIGN PHILOSOPHY: ZERO REPETITIVE TEMPLATES

Every demo in the STARX ALPHA LABS Demo Center must feel like a bespoke product designed by a specialized digital agency or enterprise software product team.

### Strict Anti-Patterns Prohibited:
- **No generic purple-blue gradients on every screen.**
- **No uniform "sidebar + 4 metric cards + 1 table" on every demo.**
- **No lorem ipsum or dummy strings.** Every dataset must use domain-specific commercial naming.
- **No fake non-clickable buttons.** If a button is visible, it must execute a real state change or trigger an appropriate modal/drawer.
- **No generic icons without purpose.** Custom visual elements, SVG diagrams, and status indicators must be tailored to the business domain.

---

## 2. CATEGORY DESIGN DIRECTIONS & PALETTES

| Category | Primary Visual Mood | Signature Color Palette | Typography Treatment |
|---|---|---|---|
| **01. Food & Hospitality** | Warm, sensory, culinary & operational | Warm Charcoal `#181615`, Copper `#C87D55`, Warm Ivory `#FDFBF7`, Olive `#556B2F` | Editorial Serif headings (`Playfair` / `Cinzel` tone) + Crisp Sans (`Inter`) |
| **02. Retail & Ecommerce** | Editorial, high-conversion, brand-forward | Rich Black `#0F0F11`, Stone `#E6E4DF`, Deep Terracotta `#B35439`, Emerald `#1B4332` | Magazine Serif for luxury, Condensed grotesque for streetwear, Modern Sans for tech |
| **03. Healthcare** | Clinical calm, sterile clarity, patient-first | Medical Navy `#0C2340`, Aqua Mint `#E0F2F1`, Ice Blue `#007791`, Crisp White `#FFFFFF` | Clear, highly legible, accessible human-centered Sans-serif |
| **04. Real Estate** | Architectural structure, prestige & space | Dark Forest `#1B2A22`, Limestone `#F4F1EA`, Warm Copper `#9C5B32`, Slate `#334155` | Architectural display typography + structured tabular numbers |
| **05. Education** | Engaging, intellectual, encouraging | Academic Navy `#1E3A8A`, School Parchment `#FAF7EE`, Saffron `#F59E0B`, Mint `#10B981` | Scholarly geometric Sans + approachable rounded accents |
| **06. Automotive** | Mechanical precision, high-velocity, industrial | Asphalt `#121214`, Racing Red `#DC2626`, Signal Yellow `#EAB308`, Metallic Silver `#94A3B8` | Technical condensed typography + bold numeric telemetry gauges |
| **07. Beauty & Wellness** | Tactile, soothing, organic luxury | Dusty Rose `#D8A49B`, Muted Sage `#8A9A86`, Champagne `#F3EFE0`, Plum `#3E1F47` | High-contrast editorial Serif + generous whitespace and soft pill controls |
| **08. Logistics & Transport** | Mission-control, high-density telemetry | Deep Navy `#0F172A`, Vivid Amber `#F97316`, Fleet Cyan `#06B6D4`, Signal White `#F8FAFC` | Compact, monospaced-accented operational typography + status badges |
| **09. Professional Services** | Confidential, prestigious, institutional trust | Executive Charcoal `#1E293B`, Regal Burgundy `#5B1D28`, British Racing Green `#064E3B` | Classic corporate Serif + sharp tabular data styling |
| **10. Manufacturing** | Rugged industrial, high-durability telemetry | Industrial Charcoal `#1C1917`, Signal Orange `#EA580C`, Steel `#64748B`, Machine Green `#15803D` | Heavy industrial Sans + monospace machine coordinates |
| **11. Travel & Events** | Experiential, scenic, celebratory | Ocean Blue `#0369A1`, Sunset Coral `#F43F5E`, Warm Sand `#FEF3C7`, Violet `#7C3AED` | Expressive destination typography + full-bleed visual cards |
| **12. Technology & SaaS** | Technical elegance, high-density analytics | Ink Black `#090D16`, Electric Azure `#0284C7`, Cyber Mint `#10B981`, Muted Violet `#8B5CF6` | Precision developer Grotesk + code monospace elements |

---

## 3. BESPOKE INTERACTIVE COMPONENT LIBRARY

The Demo Center provides specialized interactive components built natively in React 19:
1. **Interactive Restaurant Floorplan:** Visual tables with real-time seating statuses (Available, Seated, Billing, Needs Attention) and click-to-seat workflow.
2. **Kitchen Order Ticket (KOT) Dispatcher:** Kanban board tracking New $\rightarrow$ Preparing $\rightarrow$ Ready $\rightarrow$ Dispatched with simulated chef timers.
3. **Interactive Dental Tooth Chart:** SVG dental arch allowing tooth selection, condition tagging (Cavity, Crown, Missing), and treatment estimate calculation.
4. **Diagnostic Specimen Accessioning Rack:** Tube rack visualization with barcode scanning simulation and lab progress stepper.
5. **Logistics Route Dispatch Map:** Live simulated fleet routing with vehicle breadcrumbs, delivery ETA calculations, and driver manifest signing.
6. **Property Split-Screen Map & Card Grid:** Interactive parcel boundaries, unit floorplan selectors, and virtual tour previewers.
7. **Production Machine Line Console:** Real-time OEE gauges (Availability, Performance, Quality) with machine fault reason logger.
8. **Interactive REST API Explorer:** Method pills (GET, POST), parameter builders, code snippet switchers (cURL, TypeScript, Python), and live mock responses.
9. **Visual Workflow Node Canvas:** Connected trigger-to-action blocks with drag-and-connect simulation and execution status logs.
10. **Universal Interactive Header:** Subtle top-chrome showing the product name, company logo, industry badge, "Reset Demo" button, and "Request Custom Solution" CTA.

---

## 4. RESPONSIVE DESIGN & ACCESSIBILITY SPECIFICATIONS

- **Mobile Viewport (390px - 768px):** Bespoke bottom navigation bars, collapsible drawer sheets for complex forms, optimized tap targets (minimum 44x44px).
- **Tablet Viewport (768px - 1024px):** Adaptive 2-column layouts with collapsible panels.
- **Desktop Viewport (1024px - 1920px+):** High-density multi-pane workspaces with zero horizontal scrolling.
- **Accessibility:** Full keyboard tab navigation, ARIA landmarks, WCAG AA color contrast on all text elements, and respects `prefers-reduced-motion`.
