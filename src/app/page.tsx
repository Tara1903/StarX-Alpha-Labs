import { Immersive3DEnvironment } from "@/components/3d/Immersive3DEnvironment";
import { Navbar } from "@/components/marketing/Navbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CompanyIntro } from "@/components/marketing/CompanyIntro";
import { DivisionsSection } from "@/components/marketing/DivisionsSection";
import { CapabilitiesSection } from "@/components/marketing/CapabilitiesSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { DemoShowcaseSection } from "@/components/marketing/DemoShowcaseSection";
import { EngineeringSection } from "@/components/marketing/EngineeringSection";
import { SelectedWorkSection } from "@/components/marketing/SelectedWorkSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { WhyChooseUsSection } from "@/components/marketing/WhyChooseUsSection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#087BFF] selection:text-white overflow-x-hidden">
      {/* Full-Screen Transparent 3D Neural Environment */}
      <Immersive3DEnvironment />

      {/* Lightweight Digital Engineering Atmosphere Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Top Radial Depth Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] md:w-[1200px] h-[550px] bg-gradient-to-b from-[#087BFF]/25 via-[#00D9FF]/12 to-transparent blur-[140px] rounded-full" />
        {/* Lateral Ambient Glows */}
        <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-[#087BFF]/12 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-[#873BFF]/12 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-[#00D9FF]/8 blur-[180px] rounded-full" />
        {/* Fine Engineering Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Global Transparent Floating Header */}
      <Navbar />

      <main className="grow relative z-10">
        {/* Section 1: Dynamic Engineering Hero & Dual Mockup Cockpit */}
        <HeroSection />

        {/* Section 2: Technology Statement & Overview */}
        <CompanyIntro />

        {/* Section 3: Operating Divisions (Website, Mobile App, Combo) */}
        <DivisionsSection />

        {/* Section 4: 160+ Enterprise Demo Models Showcase */}
        <DemoShowcaseSection />

        {/* Section 5: Comprehensive Services Catalog */}
        <ServicesSection />

        {/* Section 6: Engineering Process & Methodology */}
        <EngineeringSection />

        {/* Section 7: Full Capability Matrix */}
        <CapabilitiesSection />

        {/* Section 8: Selected Work & Architecture Case Studies */}
        <SelectedWorkSection />

        {/* Section 9: 12 High-Growth Industry Sector Blueprints */}
        <IndustriesSection />

        {/* Section 10: Why Choose StarX Alpha Labs (6 Key Pillars) */}
        <WhyChooseUsSection />

        {/* Section 11: STARX FLOW Ecosystem Bridge */}
        <EcosystemSection />

        {/* Section 12: Final Engagement CTA */}
        <FinalCTA />
      </main>

      {/* Corporate Minimal Footer */}
      <Footer />
    </div>
  );
}
