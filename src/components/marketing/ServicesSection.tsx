"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { SERVICES_DATA, type ServiceItem } from "@/data/services";
import { ArrowUpRight, Sparkles, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "digital", label: "STARX Digital" },
    { id: "systems", label: "STARX Systems" },
    { id: "ai", label: "STARX AI" },
    { id: "maintenance", label: "Maintenance" },
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-10 sm:py-12 md:py-16 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Comprehensive Engineering Catalog
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              Software Solutions Built for Scale.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              Explore our ten specialized engineering offerings. From mission-critical cloud backends
              to high-conversion e-commerce storefronts and custom AI workflows.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-[#1769AA]/40 text-[#73D8FF] border border-[#32A9E8]/50 shadow-md shadow-[#32A9E8]/20"
                    : "glass-panel text-slate-300 hover:text-white hover:border-[rgba(130,180,220,0.3)]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Editorial Grid */}
        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative rounded-3xl p-7 glass-panel glass-panel-hover flex flex-col justify-between h-full border-[rgba(130,180,220,0.18)] hover:border-[#73D8FF]/50 transition-all duration-300 block"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#102D50]/60 text-[#73D8FF]">
                      {service.categoryLabel}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-[rgba(130,180,220,0.2)] flex items-center justify-center group-hover:border-[#73D8FF] group-hover:bg-[#73D8FF]/10 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#73D8FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#73D8FF] transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#A3B4C7] leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-[rgba(130,180,220,0.12)] flex flex-wrap gap-1.5">
                    {service.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#07111F]/60 text-slate-300 border border-[rgba(130,180,220,0.14)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[rgba(130,180,220,0.12)] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#32A9E8]" />
                    <span>{service.estimatedTimeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#73D8FF]" />
                    <span>{service.startingPrice}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
