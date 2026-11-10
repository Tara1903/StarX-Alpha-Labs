import { Immersive3DEnvironment } from "@/components/3d/Immersive3DEnvironment";
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
    <div className="relative min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC] selection:bg-[#1769AA] selection:text-white">
      {/* Full-Screen Transparent 3D Neural Environment (Client isolated with progressive ambient fallback) */}
      <Immersive3DEnvironment />

      {/* Global Transparent Floating Header */}
      <Navbar />

      <main className="grow relative z-10">
        {/* Section 1: Immersive 3D Hero (Instant Server-Rendered LCP) */}
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
