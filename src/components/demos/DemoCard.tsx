"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DemoModel } from "@/types/demo";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Play, 
  ExternalLink, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  FileText, 
  Send,
  Building,
  Video,
  ChevronDown,
  ChevronUp,
  Tag
} from "lucide-react";

interface DemoCardProps {
  demo: DemoModel;
  onOpenVideo?: (demo: DemoModel) => void;
  onOpenCustomization?: (demo: DemoModel) => void;
}

export function DemoCard({ demo, onOpenVideo, onOpenCustomization }: DemoCardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [showFullFeatures, setShowFullFeatures] = useState(false);

  const isLive = demo.availabilityStatus === "Live Demo";

  const getStatusBadge = (status: DemoModel["availabilityStatus"]) => {
    switch (status) {
      case "Live Demo":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Offline Ready":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "Under Development":
      case "Coming Soon":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Planned":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="group relative rounded-2xl bg-[#091527]/90 border border-[#163359] hover:border-[#32A9E8]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_12px_36px_-10px_rgba(50,169,232,0.25)]">
      {/* Top Banner & Badges */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link 
            href={`/demos/${demo.categorySlug}`}
            className="text-xs font-semibold uppercase tracking-wider text-[#32A9E8] hover:text-[#73D8FF] transition-colors flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-[#32A9E8]" />
            <span className="truncate max-w-[200px]">{demo.categoryName}</span>
          </Link>
          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getStatusBadge(demo.availabilityStatus)} flex items-center gap-1 shrink-0`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {demo.availabilityStatus}
          </span>
        </div>

        {/* Demo Title & Category Number */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link href={`/demos/${demo.categorySlug}/${demo.slug}`} className="hover:text-[#32A9E8] transition-colors">
            <h3 className="text-lg font-bold text-white group-hover:text-[#73D8FF] transition-colors leading-snug">
              {demo.name}
            </h3>
          </Link>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40 shrink-0">
            #{demo.id}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {demo.shortDescription}
        </p>

        {/* Suitable For */}
        <div className="mb-4 text-xs flex items-start gap-1.5 text-slate-400 bg-[#06101E]/60 p-2.5 rounded-xl border border-[#132B4C]">
          <Building className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-200 font-medium">Ideal for: </span>
            <span className="text-slate-300">{demo.suitableFor}</span>
          </div>
        </div>

        {/* Main Features */}
        <div className="space-y-1.5 mb-4">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Key Enterprise Capabilities:</span>
            <button 
              onClick={() => setShowFullFeatures(!showFullFeatures)}
              className="text-[#32A9E8] hover:underline flex items-center text-[11px]"
            >
              {showFullFeatures ? "Collapse" : `+${demo.mainFeatures.length - 3} more`}
              {showFullFeatures ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
            </button>
          </div>
          <ul className="space-y-1.5">
            {(showFullFeatures ? demo.mainFeatures : demo.mainFeatures.slice(0, 3)).map((feat, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specification Chips */}
        <div className="pt-3 border-t border-[#132B4C] grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-[#32A9E8]" />
            <span className="text-slate-400">Type:</span>
            <span className="font-medium text-white truncate">{demo.developmentType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Est. Time:</span>
            <span className="font-medium text-white">{demo.estimatedDevelopmentTime}</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {demo.techStack.slice(0, 4).map((tech, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0F243E] text-slate-300 border border-[#1A3D68]">
              {tech}
            </span>
          ))}
          {demo.techStack.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#0F243E] text-slate-400 border border-[#1A3D68]">
              +{demo.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Indicative Pricing */}
        <div className="flex items-baseline justify-between bg-gradient-to-r from-[#0C1B33] to-[#0A172C] p-2.5 rounded-xl border border-[#173863] mb-4">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{t("meta.startingPrice")}</span>
          <div className="text-right">
            <span className="text-base font-extrabold text-[#73D8FF]">{demo.indicativeStartingPrice}</span>
            <span className="text-xs text-slate-400 ml-1.5 font-mono">({demo.indicativePriceUsd})</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="p-4 pt-2 bg-[#060F1D]/80 border-t border-[#132B4C] flex flex-col gap-2">
        {/* Row 1: Primary Demo Actions */}
        <div className="grid grid-cols-2 gap-2">
          {/* Button 1: View Live Demo (only active when published & live) */}
          {isLive ? (
            <Link
              href={`/demos/${demo.categorySlug}/${demo.slug}/live`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1769AA] hover:bg-[#1E7ECA] text-white shadow-md shadow-[#1769AA]/30 transition-all border border-[#32A9E8]/40"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#73D8FF]" />
              <span>{t("btn.viewLiveDemo")}</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title="This StarX Forge solution blueprint is currently under development and will open once published."
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#0B192E] text-amber-300/90 border border-amber-500/30 cursor-not-allowed select-none"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Coming Soon</span>
            </span>
          )}

          {/* Button 2: Watch Demo Video or Inspect Blueprint */}
          <Link
            href={`/demos/${demo.categorySlug}/${demo.slug}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#10243E] hover:bg-[#18365D] text-slate-200 border border-[#1D406E] transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-[#32A9E8]" />
            <span>View Blueprint</span>
          </Link>
        </div>

        {/* Row 2: Secondary Specification & Enquiry Actions */}
        <div className="grid grid-cols-3 gap-1.5">
          {/* Button 3: View Features */}
          <Link
            href={`/demos/${demo.categorySlug}/${demo.slug}#features`}
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white bg-[#0A172B] hover:bg-[#122442] border border-[#163359] transition-all text-center"
          >
            <Sparkles className="w-3 h-3 text-[#32A9E8]" />
            <span className="truncate">{t("btn.viewFeatures")}</span>
          </Link>

          {/* Button 4: Request Customization */}
          <button
            type="button"
            onClick={() => onOpenCustomization ? onOpenCustomization(demo) : router.push(`/contact?demo=${demo.slug}&customization=true`)}
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium text-amber-300 hover:text-amber-200 bg-[#261F0E]/70 hover:bg-[#362C15] border border-amber-500/30 transition-all text-center"
          >
            <Cpu className="w-3 h-3 text-amber-400" />
            <span className="truncate">Customize</span>
          </button>

          {/* Button 5: Get Quotation */}
          <Link
            href={`/get-quote?demo=${demo.slug}`}
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold text-[#73D8FF] hover:text-white bg-[#0D2444] hover:bg-[#153460] border border-[#32A9E8]/30 transition-all text-center"
          >
            <FileText className="w-3 h-3 text-[#32A9E8]" />
            <span className="truncate">Quotation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
