"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Terminal } from "lucide-react";

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web & Portals" },
    { key: "systems", label: "Custom Software & Systems" },
    { key: "ai", label: "Custom AI & RAG" },
  ];

  const filteredProjects = activeCategory === "all"
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Disclaimer Alert: 100% Honest Positioning */}
      <div className="p-4 rounded-xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#32A9E8] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-white block">Factual Architectural Showcases</span>
          <p className="text-slate-300 leading-relaxed">
            StarX Alpha Labs strictly refuses to fabricate client relationships, fake testimonials, or fictional revenue claims.
            The projects featured below represent live architectural reference designs, proprietary prototypes, and benchmark systems engineered by our team.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(130,180,220,0.18)] pb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#32A9E8] text-white shadow-md shadow-[#32A9E8]/20"
                : "bg-[#0B192B]/80 text-slate-400 hover:text-white border border-[rgba(130,180,220,0.18)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.slug}
            className="p-8 rounded-3xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] hover:border-[#32A9E8] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="electric" size="sm" dot>
                  {project.projectType}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400">
                  {project.categoryLabel}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1.5">{project.title}</h3>
                <p className="text-xs font-medium text-[#32A9E8]">{project.tagline}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[rgba(130,180,220,0.18)]/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Key Capabilities
                </span>
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(130,180,220,0.18)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07111F] text-slate-400 border border-[rgba(130,180,220,0.18)]">
                    {tech}
                  </span>
                ))}
              </div>

              <LinkButton
                href={`/portfolio/${project.slug}`}
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Case Study
              </LinkButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
