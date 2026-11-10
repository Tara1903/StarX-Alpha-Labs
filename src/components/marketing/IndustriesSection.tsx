import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DEMO_CATEGORIES } from "@/data/categories";
import { 
  ArrowUpRight, 
  Sparkles, 
  UtensilsCrossed, 
  ShoppingBag, 
  GraduationCap, 
  HeartPulse, 
  Briefcase, 
  Home, 
  Wrench, 
  Factory, 
  Cpu, 
  Users2, 
  Video, 
  Smartphone 
} from "lucide-react";

export function IndustriesSection() {
  const iconMap: Record<string, React.ElementType> = {
    UtensilsCrossed,
    ShoppingBag,
    GraduationCap,
    HeartPulse,
    Briefcase,
    Home,
    Wrench,
    Factory,
    Cpu,
    Users2,
    Video,
    Smartphone
  };

  // Specific accent colors defined in prompt for the 12 categories:
  // 1. Restaurant — Orange
  // 2. E-commerce — Electric Blue
  // 3. Education — Purple
  // 4. Healthcare — Magenta
  // 5. Business CRM — Cyan
  // 6. Real Estate — Emerald
  // 7. Professional Services — Blue
  // 8. Manufacturing — Orange
  // 9. AI Tech — Purple
  // 10. Membership — Pink
  // 11. Media — Cyan
  // 12. Mobile Apps — Purple
  const colorAccents: Record<number, { border: string; glow: string; text: string; bg: string }> = {
    1: { border: "border-[#FF941F]/40 hover:border-[#FF941F]", glow: "rgba(255, 148, 31, 0.15)", text: "text-[#FF941F]", bg: "bg-[#FF941F]/20" },
    2: { border: "border-[#087BFF]/40 hover:border-[#087BFF]", glow: "rgba(8, 123, 255, 0.15)", text: "text-[#087BFF]", bg: "bg-[#087BFF]/20" },
    3: { border: "border-[#873BFF]/40 hover:border-[#873BFF]", glow: "rgba(135, 59, 255, 0.15)", text: "text-[#873BFF]", bg: "bg-[#873BFF]/20" },
    4: { border: "border-[#E52BFF]/40 hover:border-[#E52BFF]", glow: "rgba(229, 43, 255, 0.15)", text: "text-[#E52BFF]", bg: "bg-[#E52BFF]/20" },
    5: { border: "border-[#00D9FF]/40 hover:border-[#00D9FF]", glow: "rgba(0, 217, 255, 0.15)", text: "text-[#00D9FF]", bg: "bg-[#00D9FF]/20" },
    6: { border: "border-[#00C98B]/40 hover:border-[#00C98B]", glow: "rgba(0, 201, 139, 0.15)", text: "text-[#00C98B]", bg: "bg-[#00C98B]/20" },
    7: { border: "border-[#245BFF]/40 hover:border-[#245BFF]", glow: "rgba(36, 91, 255, 0.15)", text: "text-[#245BFF]", bg: "bg-[#245BFF]/20" },
    8: { border: "border-[#FF941F]/40 hover:border-[#FF941F]", glow: "rgba(255, 148, 31, 0.15)", text: "text-[#FF941F]", bg: "bg-[#FF941F]/20" },
    9: { border: "border-[#873BFF]/40 hover:border-[#873BFF]", glow: "rgba(135, 59, 255, 0.15)", text: "text-[#873BFF]", bg: "bg-[#873BFF]/20" },
    10: { border: "border-[#FF35B8]/40 hover:border-[#FF35B8]", glow: "rgba(255, 53, 184, 0.15)", text: "text-[#FF35B8]", bg: "bg-[#FF35B8]/20" },
    11: { border: "border-[#00D9FF]/40 hover:border-[#00D9FF]", glow: "rgba(0, 217, 255, 0.15)", text: "text-[#00D9FF]", bg: "bg-[#00D9FF]/20" },
    12: { border: "border-[#873BFF]/40 hover:border-[#873BFF]", glow: "rgba(135, 59, 255, 0.15)", text: "text-[#873BFF]", bg: "bg-[#873BFF]/20" }
  };

  return (
    <section id="industries" className="relative py-16 sm:py-20 md:py-24 bg-[#030B24] overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#00D9FF]">
              Sector Blueprints
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Explore Our 12 Industry Solutions
          </h2>

          <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto font-light leading-relaxed">
            From multi-branch restaurant ERPs and high-conversion e-commerce storefronts to AI automation platforms
            and on-demand logistics architectures.
          </p>
        </div>

        {/* 12 Industry Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DEMO_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.iconName] || Briefcase;
            const style = colorAccents[cat.number] || colorAccents[5];

            return (
              <Link
                key={cat.slug}
                href={`/demos?category=${cat.slug}`}
                className={`group rounded-3xl p-6 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between h-full relative hover:scale-[1.02] ${style.border}`}
                style={{
                  boxShadow: `0 4px 20px 0 ${style.glow}`
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${style.bg} ${style.text} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071638] text-slate-400 border border-white/5">
                      {cat.count} Models
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Sector #{cat.number}
                    </span>
                    <h3 className={`text-lg font-bold text-white group-hover:${style.text} transition-colors tracking-tight`}>
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#C8D5EF] leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    {cat.highlights.slice(0, 2).map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <span className={`w-1 h-1 rounded-full ${style.text} bg-current shrink-0`} />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Explore {cat.count} Demos</span>
                  <ArrowUpRight className={`w-4 h-4 ${style.text} transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
