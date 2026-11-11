import { Navbar } from "@/components/marketing/Navbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { DivisionsSection } from "@/components/marketing/DivisionsSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { DemoShowcaseSection } from "@/components/marketing/DemoShowcaseSection";
import { WhyChooseUsSection } from "@/components/marketing/WhyChooseUsSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#087BFF] selection:text-white overflow-x-hidden">
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
        {/* 1. Hero & 3D Interactive Device Stage & Horizontal Stats Bar */}
        <HeroSection />

        {/* 2. Our Core Solutions (Website, Mobile App, Combo) with 3D Tilt Cards */}
        <DivisionsSection />

        {/* 3. Explore Our 12 Industry Solutions Grid */}
        <IndustriesSection />

        {/* 4. 160+ Enterprise Demo Models Showcase */}
        <DemoShowcaseSection />

        {/* 5. Why Choose STARX ALPHA LABS? (6 Strategic Pillars) */}
        <WhyChooseUsSection />

        {/* 6. Have a Project in Mind? (Final Project CTA) */}
        <FinalCTA />
      </main>

      {/* Corporate Minimal Footer */}
      <Footer />
    </div>
  );
}
