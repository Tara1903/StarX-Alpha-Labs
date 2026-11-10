"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { SceneBoundary } from "@/components/3d/SceneBoundary";
import { SampleScene } from "@/components/3d/SampleScene";
import { BRAND_COLORS } from "@/lib/constants";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Cpu,
  Layers,
  Lock,
  Mail,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

export default function DesignSystemPreviewPage() {
  const [formInput, setFormInput] = React.useState("");
  const [formError, setFormError] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F8FAFC] pb-24">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[rgba(130,180,220,0.18)] bg-[#07111F]/90 backdrop-blur-md">
        <Container className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-xl tracking-tight text-white">
                STARX <span className="text-[#32A9E8]">ALPHA LABS</span>
              </span>
            </Link>
            <span className="text-xs text-slate-500 font-mono">/</span>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#32A9E8]">
              Design System v1.0
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LinkButton href="/" variant="outline" size="sm">
              &larr; Back to Home
            </LinkButton>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setButtonLoading(true);
                setTimeout(() => setButtonLoading(false), 1500);
              }}
              isLoading={buttonLoading}
            >
              Test Loading
            </Button>
          </div>
        </Container>
      </header>

      {/* Hero Header */}
      <Section variant="cinematic-dark" spacing="md">
        <FadeIn>
          <div className="max-w-3xl space-y-4">
            <Badge variant="electric" dot>
              Component Specification & Tokens
            </Badge>
            <h1 className="text-display font-extrabold text-white">
              Hybrid Cinematic Corporate
            </h1>
            <p className="text-body text-slate-300 max-w-2xl">
              Unified design language for high-performance public marketing, client enterprise
              platforms, and administrative interfaces.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Container className="space-y-20">
        {/* 1. Brand Color Tokens */}
        <section id="colors" className="space-y-6">
          <div className="border-b border-[rgba(130,180,220,0.18)] pb-3">
            <h2 className="text-h2 text-white">1. Brand Color Tokens</h2>
            <p className="text-caption text-slate-400">
              Deterministic hex tokens. No arbitrary gradients or unapproved color variations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Primary Navy", hex: BRAND_COLORS.primaryNavy, token: "--brand-navy", textDark: false },
              { label: "Corporate Blue", hex: BRAND_COLORS.corporateBlue, token: "--brand-corporate", textDark: false },
              { label: "Electric Blue", hex: BRAND_COLORS.electricBlue, token: "--brand-electric", textDark: false },
              { label: "Light Background", hex: BRAND_COLORS.lightBackground, token: "--brand-light-bg", textDark: true },
              { label: "Dark Text", hex: BRAND_COLORS.darkText, token: "--brand-dark-text", textDark: false },
              { label: "Muted Text", hex: BRAND_COLORS.mutedText, token: "--brand-muted", textDark: false },
              { label: "Success", hex: BRAND_COLORS.success, token: "--brand-success", textDark: false },
              { label: "Warning", hex: BRAND_COLORS.warning, token: "--brand-warning", textDark: false },
              { label: "Danger", hex: BRAND_COLORS.danger, token: "--brand-danger", textDark: false },
              { label: "Border Token", hex: BRAND_COLORS.border, token: "--brand-border", textDark: true },
              { label: "Dark Surface", hex: BRAND_COLORS.darkSurface, token: "--brand-dark-surface", textDark: false },
              { label: "Dark Border", hex: BRAND_COLORS.darkSurfaceBorder, token: "--brand-dark-border", textDark: false },
            ].map((color) => (
              <div
                key={color.label}
                className="p-4 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-2"
              >
                <div
                  className="h-16 w-full rounded-lg shadow-inner border border-white/10 flex items-center justify-center font-mono text-xs font-bold"
                  style={{
                    backgroundColor: color.hex,
                    color: color.textDark ? "#172B43" : "#FFFFFF",
                  }}
                >
                  {color.hex}
                </div>
                <div>
                  <div className="text-xs font-bold text-white truncate">{color.label}</div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">{color.token}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography Scale & Multilingual Support */}
        <section id="typography" className="space-y-6">
          <div className="border-b border-[rgba(130,180,220,0.18)] pb-3">
            <h2 className="text-h2 text-white">2. Typography Scale & Bilingual Foundation</h2>
            <p className="text-caption text-slate-400">
              Inter for International English & Noto Sans Devanagari for Hindi localization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* English Typography */}
            <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(130,180,220,0.18)] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#32A9E8]">
                  English — Inter
                </span>
                <Badge variant="navy" size="sm">Primary</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Display (4.5rem)</span>
                  <div className="text-display text-white">Architectural AI</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H1 (3.25rem)</span>
                  <div className="text-h1 text-white">Enterprise Systems</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H2 (2.25rem)</span>
                  <div className="text-h2 text-white">Cinematic Digital Engineering</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H3 (1.625rem)</span>
                  <div className="text-h3 text-white">Bespoke Solutions & Integration</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Body (1rem / 16px)</span>
                  <p className="text-body text-slate-300">
                    StarX Alpha Labs architects mission-critical digital infrastructure for forward-looking enterprises globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Hindi Typography */}
            <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(130,180,220,0.18)] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#32A9E8]">
                  Hindi — Noto Sans Devanagari
                </span>
                <Badge variant="corporate" size="sm">Localization Ready</Badge>
              </div>

              <div className="space-y-4 font-devanagari">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Display (देवनागरी)</span>
                  <div className="text-display text-white">स्टारएक्स लैब्स</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H1 (शीर्षक १)</span>
                  <div className="text-h1 text-white">उन्नत डिजिटल वास्तुकला</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H2 (शीर्षक २)</span>
                  <div className="text-h2 text-white">उच्च प्रदर्शन सॉफ्टवेयर समाधान</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">H3 (शीर्षक ३)</span>
                  <div className="text-h3 text-white">सिनेमैटिक तकनीक और नवाचार</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Body (मूल पाठ)</span>
                  <p className="text-body text-slate-300">
                    स्टारएक्स लैब्स वैश्विक स्तर पर अग्रणी उद्यमों के लिए उच्च स्तरीय सॉफ्टवेयर और आधुनिक डिजिटल समाधान तैयार करता है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Reusable UI Components */}
        <section id="components" className="space-y-6">
          <div className="border-b border-[rgba(130,180,220,0.18)] pb-3">
            <h2 className="text-h2 text-white">3. Reusable UI Components</h2>
            <p className="text-caption text-slate-400">
              Buttons, Badges, Cards, and Form controls across variants and responsive states.
            </p>
          </div>

          {/* Button Variants & Sizes */}
          <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-6">
            <h3 className="text-h3 text-white">Buttons & Links</h3>

            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Variants</span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Electric</Button>
                <Button variant="corporate">Corporate Blue</Button>
                <Button variant="navy">Deep Navy</Button>
                <Button variant="secondary">Secondary Surface</Button>
                <Button variant="outline">Outline Electric</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>

            <Divider variant="subtle" />

            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Sizes & Icons</span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" leftIcon={<Zap className="w-3.5 h-3.5" />}>
                  Small Action
                </Button>
                <Button variant="corporate" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Standard Medium
                </Button>
                <Button variant="primary" size="lg" leftIcon={<Sparkles className="w-5 h-5" />}>
                  Large Primary Hero
                </Button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-4">
            <h3 className="text-h3 text-white">Badges</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="electric" dot>Electric Indicator</Badge>
              <Badge variant="corporate" dot>Corporate Status</Badge>
              <Badge variant="navy">Navy Tag</Badge>
              <Badge variant="success" dot>Operational</Badge>
              <Badge variant="warning" dot>Audit Review</Badge>
              <Badge variant="danger" dot>Action Required</Badge>
              <Badge variant="outline">Outline Neutral</Badge>
            </div>
          </div>

          {/* Cards Comparison: Cinematic Dark vs Corporate Light */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cinematic Card */}
            <Card variant="cinematic" hoverable>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="electric" size="sm">Cinematic Dark</Badge>
                  <Cpu className="w-5 h-5 text-[#32A9E8]" />
                </div>
                <CardTitle>Autonomous Platform Engineering</CardTitle>
                <CardDescription>
                  Designed for the public web presence and mission-critical client interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Deep navy `#0F2038` surface token with `#19375E` structural border and dynamic `#32A9E8` focus elevation.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-400 font-mono">Token: card-cinematic</span>
                <Button variant="outline" size="sm">Explore Module</Button>
              </CardFooter>
            </Card>

            {/* Corporate Light Card */}
            <Card variant="corporate" hoverable>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="corporate" size="sm">Corporate Light</Badge>
                  <Layers className="w-5 h-5 text-[#1769AA]" />
                </div>
                <CardTitle>Enterprise Governance & Reporting</CardTitle>
                <CardDescription>
                  Designed for customer portal sections, data grids, and administrative surfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#172B43] leading-relaxed">
                  Pure `#FFFFFF` surface on `#F4F8FC` background with `#DDE7F0` border and `#1769AA` accents.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-500 font-mono">Token: card-corporate</span>
                <Button variant="corporate" size="sm">Manage Scope</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Form Components */}
          <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-h3 text-white">Form Components & Validation States</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFormError(!formError)}
              >
                Toggle Error State ({formError ? "Active" : "Normal"})
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                required
                htmlFor="input-name"
                error={formError ? "Full name is required" : undefined}
                helperText="Enter your official business contact name"
              >
                <Input
                  id="input-name"
                  placeholder="e.g. David Vance"
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  error={formError}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                label="Corporate Email"
                required
                htmlFor="input-email"
                error={formError ? "Please enter a valid corporate email" : undefined}
                helperText="We send project proposals only to verified domains"
              >
                <Input
                  id="input-email"
                  type="email"
                  placeholder="name@company.com"
                  error={formError}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                label="Division of Interest"
                required
                htmlFor="select-division"
                helperText="Select the primary capability your project requires"
              >
                <Select
                  id="select-division"
                  placeholder="Select division..."
                  options={[
                    { label: "StarX Engineering (Custom Software)", value: "engineering" },
                    { label: "StarX Cloud (Cloud & Security Architecture)", value: "cloud" },
                    { label: "StarX Alpha AI (Autonomous AI Solutions)", value: "ai" },
                    { label: "StarX Experience (Cinematic Web Apps)", value: "experience" },
                  ]}
                />
              </FormField>

              <FormField
                label="Project Timeline"
                htmlFor="input-timeline"
                helperText="Estimated target commencement"
              >
                <Input
                  id="input-timeline"
                  placeholder="Q2 2026 / Immediate"
                  rightIcon={<Lock className="w-4 h-4" />}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField
                  label="Project Scope Brief"
                  htmlFor="input-brief"
                  helperText="Brief summary of requirements, technical objectives, and constraints"
                >
                  <Textarea
                    id="input-brief"
                    rows={3}
                    placeholder="Describe your technical requirements..."
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Motion Primitives */}
        <section id="motion" className="space-y-6">
          <div className="border-b border-[rgba(130,180,220,0.18)] pb-3">
            <h2 className="text-h2 text-white">4. Motion Primitives</h2>
            <p className="text-caption text-slate-400">
              Hardware-accelerated Motion for React components with built-in prefers-reduced-motion safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reveal Animation Demo */}
            <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Reveal Primitive (Directional & Bounded)
              </span>
              <Reveal direction="up" distance={20}>
                <div className="p-4 rounded-lg bg-[#102D50] border border-[#32A9E8]/30 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#32A9E8] shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Reveal from bottom</h4>
                    <p className="text-xs text-slate-300">Smooth cubic-bezier easing with viewport trigger.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" distance={25} delay={0.2}>
                <div className="p-4 rounded-lg bg-[#102D50] border border-[#1769AA]/40 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-[#63B8F8] shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Reveal from left with delay</h4>
                    <p className="text-xs text-slate-300">Guarantees zero cumulative layout shift (CLS).</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Stagger Container Demo */}
            <div className="p-6 rounded-xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                StaggerContainer & StaggerItem
              </span>
              <StaggerContainer staggerDelay={0.15} className="space-y-3">
                {["Phase 1: Architecture Foundation", "Phase 2: Design System Execution", "Phase 3: Cinematic Homepage"].map((step, idx) => (
                  <StaggerItem key={step}>
                    <div className="p-3 rounded-lg bg-[#07111F] border border-[rgba(130,180,220,0.18)] flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{step}</span>
                      <Badge variant={idx < 2 ? "success" : "electric"} size="sm">
                        {idx < 2 ? "Verified" : "Current"}
                      </Badge>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* 5. Three.js Client Boundary Test */}
        <section id="threejs-boundary" className="space-y-6">
          <div className="border-b border-[rgba(130,180,220,0.18)] pb-3">
            <h2 className="text-h2 text-white">5. Three.js Client Boundary Test</h2>
            <p className="text-caption text-slate-400">
              Isolated R3F Canvas with WebGL detection, dynamic loading state, and static fallback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-[rgba(130,180,220,0.18)] bg-[#07111F] overflow-hidden relative min-h-[380px] flex flex-col">
              <div className="px-4 py-3 border-b border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300">R3F / Three.js Boundary Active</span>
                </div>
                <Badge variant="electric" size="sm">DPR [1, 2] &bull; High Performance</Badge>
              </div>

              {/* R3F Canvas mounted inside isolated boundary */}
              <div className="grow relative">
                <SceneBoundary cameraPosition={[0, 0, 4.5]}>
                  <SampleScene />
                </SceneBoundary>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(130,180,220,0.18)] bg-[#0B192B]/80 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="corporate">Boundary Contract</Badge>
                <h3 className="text-lg font-bold text-white">Server-Safe 3D Isolation</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dynamic client-side import with <code>ssr: false</code> prevents Node.js hydration crashes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>WebGL context check verifies canvas rendering capabilities before mounting R3F.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Primary text and CTAs are never blocked while the 3D canvas initializes.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[rgba(130,180,220,0.18)]">
                <div className="text-xs text-slate-400 font-mono">
                  Phase 3 Target: Interactive StarX 3D Emblem & Hero Scene
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
