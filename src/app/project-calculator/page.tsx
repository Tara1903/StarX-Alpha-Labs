import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { ProjectCalculatorClient } from "@/components/calculator/ProjectCalculatorClient";
import { Calculator, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Project Calculator & Quote Estimator — StarX Alpha Labs",
  description: "Configure your custom website, mobile app, or combo project in 7 easy steps. Get real-time transparent INR pricing, itemized line items, and an official instant estimate.",
};

export default function ProjectCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Header Hero Section */}
        <section className="py-12 md:py-16 relative overflow-hidden border-b border-[#0A1940]">
          <div className="absolute top-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#087BFF]/15 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#00D9FF]/12 blur-[120px]" />

          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
                <Calculator className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#00D9FF] uppercase">
                  Self-Service Engineering Configurator
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Interactive Project Calculator &amp; Scope Builder
              </h1>

              <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                Build your project specification across our three development divisions.
                Select base packages, add-on features, hosting, and SLA maintenance with real-time INR (₹) calculations.
              </p>
            </div>
          </Container>
        </section>

        {/* 7-Step Calculator Client Wrapped in Suspense */}
        <section className="py-12 bg-[#030B24]">
          <Suspense fallback={
            <div className="py-24 text-center text-slate-400 font-mono text-sm">
              Loading StarX Project Configurator...
            </div>
          }>
            <ProjectCalculatorClient />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
