import { Navbar } from "@/components/marketing/Navbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CompanyIntro } from "@/components/marketing/CompanyIntro";
import { DivisionsSection } from "@/components/marketing/DivisionsSection";
import { CapabilitiesSection } from "@/components/marketing/CapabilitiesSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { EngineeringSection } from "@/components/marketing/EngineeringSection";
import { SelectedWorkSection } from "@/components/marketing/SelectedWorkSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC] selection:bg-[#1769AA] selection:text-white overflow-x-hidden">
      {/* Lightweight Digital Engineering Atmosphere (Zero 3D/JS overhead) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Top Radial Depth Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] md:w-[1200px] h-[550px] bg-gradient-to-b from-[#1769AA]/25 via-[#32A9E8]/12 to-transparent blur-[140px] rounded-full" />
        {/* Lateral Ambient Glows */}
        <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-[#1769AA]/12 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-[#32A9E8]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-[#73D8FF]/8 blur-[180px] rounded-full" />
        {/* Fine Engineering Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(130,180,220,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(130,180,220,0.035)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Global Transparent Floating Header */}
      <Navbar />

      <main className="grow relative z-10">
        {/* Section 1: Dynamic Engineering Hero */}
        <HeroSection />

        {/* Section 2: Technology Statement */}
        <CompanyIntro />

        {/* Section 3: Operating Divisions */}
        <DivisionsSection />

        {/* Section 4: Comprehensive Services Catalog */}
        <ServicesSection />

        {/* Section 5: Engineering Process & Methodology */}
        <EngineeringSection />

        {/* Section 6: Full Capability Matrix */}
        <CapabilitiesSection />

        {/* Section 7: Selected Work & Architecture Case Studies */}
        <SelectedWorkSection />

        {/* Section 8: Targeted Industry Solutions */}
        <IndustriesSection />

        {/* Section 9: STARX FLOW Ecosystem Bridge */}
        <EcosystemSection />

        {/* Section 10: Final Engagement CTA */}
        <FinalCTA />
      </main>

      {/* Corporate Minimal Footer */}
      <Footer />
    </div>
  );
}
