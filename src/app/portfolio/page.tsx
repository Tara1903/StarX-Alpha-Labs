import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Showcases — StarX Alpha Labs",
  description: "Explore architectural reference systems, custom software prototypes, and high-performance web showcases built by StarX Alpha Labs.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Technical Showcases</Badge>
              <h1 className="text-display font-extrabold text-white">
                Engineering In Action.
              </h1>
              <p className="text-body text-slate-300">
                A curated repository of architectural demonstrations, functional software prototypes, and benchmark systems.
                Each project showcases verified technical solutions and production-grade code.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#07111F]">
          <Container>
            <PortfolioClient />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
