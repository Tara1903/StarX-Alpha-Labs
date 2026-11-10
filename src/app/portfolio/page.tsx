import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Showcases — STARX LABS",
  description: "Explore architectural reference systems, custom software prototypes, and high-performance web showcases built by STARX LABS.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#19375E]">
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

        <section className="py-20 bg-[#0A1424]">
          <Container>
            <PortfolioClient />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
