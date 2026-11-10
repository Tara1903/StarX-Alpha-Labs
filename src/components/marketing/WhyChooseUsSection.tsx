import * as React from "react";
import { Container } from "@/components/ui/Container";
import { 
  Sparkles, 
  Layers, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  Headphones,
  CheckCircle2
} from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Layers,
      title: "Fully Customizable Architecture",
      desc: "Zero cookie-cutter lock-in. Every frontend, database schema, and API route is custom-engineered to match your exact commercial workflows.",
      accent: "from-[#087BFF] to-[#00D9FF]",
      border: "hover:border-[#00D9FF]"
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery (1–4 Weeks)",
      desc: "Our pre-validated 160-model architecture foundation allows us to deploy production-grade websites and apps in days instead of months.",
      accent: "from-[#FF941F] to-[#FF35B8]",
      border: "hover:border-[#FF941F]"
    },
    {
      icon: Cpu,
      title: "Production-Ready High Performance",
      desc: "Next.js 16, React 19, serverless edge rendering, and sub-second database queries engineered for 100/100 Google Core Web Vitals.",
      accent: "from-[#00D9FF] to-[#00C98B]",
      border: "hover:border-[#00C98B]"
    },
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security & Scalability",
      desc: "Zero-trust Row Level Security (RLS), 256-bit AES encryption, multi-tenant isolation, automated offsite backups, and strict RBAC.",
      accent: "from-[#873BFF] to-[#E52BFF]",
      border: "hover:border-[#873BFF]"
    },
    {
      icon: Smartphone,
      title: "Integrated Multi-Platform Support",
      desc: "Seamless synchronization across Web, iOS, Android, and Web Admin. One unified PostgreSQL database with zero data desync.",
      accent: "from-[#E52BFF] to-[#FF35B8]",
      border: "hover:border-[#E52BFF]"
    },
    {
      icon: Headphones,
      title: "Dedicated Post-Launch Support",
      desc: "Comprehensive 30-day bug warranty included with every delivery, backed by ongoing monthly hypercare and 24/7 SLA monitoring.",
      accent: "from-[#087BFF] to-[#245BFF]",
      border: "hover:border-[#087BFF]"
    }
  ];

  return (
    <section className="py-20 bg-[#030B24] relative overflow-hidden">
      <Container className="space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#00D9FF]">
              Engineering Excellence
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Businesses Choose StarX Alpha Labs
          </h2>

          <p className="text-base text-[#C8D5EF] max-w-xl mx-auto leading-relaxed">
            We bridge the gap between creative product design and mission-critical enterprise engineering.
          </p>
        </div>

        {/* 6 Reason Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className={`p-8 rounded-3xl bg-[#0A1940] border border-white/5 transition-all duration-300 flex flex-col justify-between space-y-5 ${r.border}`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.accent} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8D5EF] leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#00C98B] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
