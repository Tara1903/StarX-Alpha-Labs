import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DEMO_CATEGORIES } from "@/data/categories";
import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Eye
} from "lucide-react";

export function DemoShowcaseSection() {
  const sampleDemos = [
    { id: 1, name: "Smart Restaurant & Cloud Kitchen POS", category: "Restaurant & Food", price: "₹18,000", time: "1–2 Weeks" },
    { id: 17, name: "Multi-Vendor B2B & D2C Marketplace", category: "E-Commerce", price: "₹45,000", time: "2–3 Weeks" },
    { id: 37, name: "Comprehensive Student & Coaching LMS", category: "Education", price: "₹28,000", time: "2 Weeks" },
    { id: 62, name: "Hospital Clinic & Telehealth System", category: "Healthcare", price: "₹38,000", time: "2–3 Weeks" },
    { id: 82, name: "Enterprise Custom CRM & Sales Pipeline", category: "Business CRM", price: "₹35,000", time: "2 Weeks" },
    { id: 122, name: "Autonomous AI Chatbot & Agent Hub", category: "AI & Automation", price: "₹40,000", time: "2 Weeks" },
  ];

  return (
    <section className="py-20 bg-[#071638] border-y border-[#0A1940] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#087BFF]/10 blur-[150px] -z-10 pointer-events-none" />

      <Container className="space-y-12">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#0A1940]/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#00D9FF]">
              Interactive Architecture Proof
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            160+ Enterprise Demo Models
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl mx-auto">
            &ldquo;Explore, Test &amp; Choose the Right Solution for Your Business.&rdquo;
          </p>
        </div>

        {/* Multi-Device Mockup Visual Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1940] border border-white/10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-4 text-xs font-mono text-[#C8D5EF]">
              <span className="flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-[#00D9FF]" /> Desktop Web
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Tablet className="w-4 h-4 text-[#873BFF]" /> Tablet POS
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#E52BFF]" /> Mobile Apps
              </span>
            </div>

            <Link
              href="/demos"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-lg"
            >
              <span>Explore All 160 Live Demos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Demos Showcase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDemos.map((demo) => (
              <div
                key={demo.id}
                className="p-5 rounded-2xl bg-[#071638] border border-white/5 hover:border-[#00D9FF]/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0A1940] text-[#00D9FF]">
                      Model #{demo.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {demo.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {demo.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400 font-mono">From {demo.price}</span>
                    <span className="text-[#00C98B] font-mono">{demo.time}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <Link
                    href={`/demos/${demo.id}`}
                    className="font-bold text-[#00D9FF] hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Test Interactive Demo</span>
                  </Link>
                  <Link
                    href={`/project-calculator`}
                    className="text-slate-400 hover:text-white"
                  >
                    Configure →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
