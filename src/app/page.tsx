import { Navbar } from "@/components/marketing/Navbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CompanyIntro } from "@/components/marketing/CompanyIntro";
import { DivisionsSection } from "@/components/marketing/DivisionsSection";
import { CapabilitiesSection } from "@/components/marketing/CapabilitiesSection";
import { EngineeringSection } from "@/components/marketing/EngineeringSection";
import { CredibilitySection } from "@/components/marketing/CredibilitySection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100 selection:bg-[#1769AA] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="grow">
        {/* 2. Cinematic 3D Hero */}
        <HeroSection />

        {/* 3. Company Introduction & Mission */}
        <CompanyIntro />

        {/* 4. Strategic Technology Divisions */}
        <DivisionsSection />

        {/* 5. Full Capability Matrix */}
        <CapabilitiesSection />

        {/* 6. Engineering Methodology & SDLC */}
        <EngineeringSection />

        {/* 7. Credibility & Engineering Standards */}
        <CredibilitySection />

        {/* 8. STARX FLOW Ecosystem Integration */}
        <EcosystemSection />

        {/* 9. Final Project Consultation CTA */}
        <FinalCTA />
      </main>

      {/* 10. Corporate Footer */}
      <Footer />
    </div>
  );
}
