"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import {
  VIDEO_CATEGORIES,
  VIDEO_ITEMS,
  VideoItem,
} from "@/data/videos";
import {
  Play,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Tv
} from "lucide-react";

export default function VideoStationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  const filteredVideos = useMemo(() => {
    return VIDEO_ITEMS.filter((video) => {
      const matchesCategory =
        selectedCategory === "all" || video.categoryId === selectedCategory;
      const matchesLanguage =
        languageFilter === "all" || video.language.toLowerCase().includes(languageFilter.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tags.some((t) => t.toLowerCase().includes(query)) ||
        video.features.some((f) => f.toLowerCase().includes(query));

      return matchesCategory && matchesLanguage && matchesQuery;
    });
  }, [selectedCategory, searchQuery, languageFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-32 pb-24 relative overflow-hidden">
        {/* Ambient Atmosphere */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#00D9FF]/15 via-[#087BFF]/10 to-transparent blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-[#E52BFF]/10 blur-[180px] pointer-events-none -z-10" />

        <Container>
          {/* Page Header */}
          <div className="max-w-3xl space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
              <Tv className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                Interactive Video Station • 12 Industry Showcases
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Watch Real Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                in Action Before You Build
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
              Explore hands-on video walkthroughs of our digital operating systems, custom websites, mobile
              applications, and automation platforms across 12 core commercial industries.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#071638]/90 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl mb-10 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search solutions, features, or keywords..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Audio Language:</span>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                >
                  <option value="all">All Languages</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi / Bilingual</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#00D9FF] text-[#030B24] shadow-[0_0_20px_#00D9FF]"
                    : "bg-[#030B24] text-slate-300 border border-white/10 hover:border-white/30"
                }`}
              >
                All Categories ({VIDEO_ITEMS.length})
              </button>

              {VIDEO_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#00D9FF] text-[#030B24] shadow-[0_0_20px_#00D9FF]"
                      : "bg-[#030B24] text-slate-300 border border-white/10 hover:border-white/30"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          {filteredVideos.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#071638]/50 border border-white/10 text-center space-y-4">
              <p className="text-slate-400 text-sm">No video demonstrations match your current search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setLanguageFilter("all");
                }}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#00D9FF] text-[#030B24]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-3xl bg-[#071638]/85 border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between group hover:border-[#00D9FF]/50 transition-all duration-300"
                >
                  {/* Thumbnail & Play Overlay */}
                  <Link href={`/video-station/${video.slug}`} className="relative block aspect-[16/9] bg-[#030B24] overflow-hidden">
                    {/* Simulated High-Res Tech Card Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#071638] via-[#041235] to-[#0A2255] flex flex-col items-center justify-center p-6 text-center select-none group-hover:scale-105 transition-transform duration-500">
                      <div className="w-14 h-14 rounded-full bg-[#00D9FF]/20 border-2 border-[#00D9FF] flex items-center justify-center text-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.6)] group-hover:scale-110 group-hover:bg-[#00D9FF] group-hover:text-[#030B24] transition-all">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      <span className="text-[11px] font-mono text-[#00D9FF] tracking-wider uppercase mt-3">
                        {video.categoryTitle}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#030B24]/90 border border-white/10 text-[11px] font-mono font-bold text-white flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3 h-3 text-[#00D9FF]" />
                      <span>{video.durationText}</span>
                    </div>

                    {/* Language Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#071638]/90 border border-[#00D9FF]/40 text-[10px] font-mono text-[#00D9FF]">
                      {video.language}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 flex flex-col justify-between grow">
                    <div className="space-y-2">
                      <Link
                        href={`/video-station/${video.slug}`}
                        className="text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors leading-snug line-clamp-2"
                      >
                        {video.title}
                      </Link>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                    </div>

                    {/* Key Features Bullet points */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {video.features.slice(0, 2).map((f) => (
                        <div key={f} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00DF89] shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/5">
                      <Link
                        href={`/video-station/${video.slug}`}
                        className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1"
                      >
                        <span>Watch Demo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/#free-personalized-demo"
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-[#FF941F] to-[#E52BFF] shadow-[0_0_15px_rgba(255,148,31,0.3)] hover:brightness-110 transition-all flex items-center gap-1"
                      >
                        <span>Get This Demo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Conversion Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#071638] via-[#0A1940] to-[#071638] border border-[#00D9FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase">
                Custom Tailored Demonstrations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Want an Interactive Demo Built for Your Company?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We will configure a working prototype with your logo, menu, catalog, or services and deliver it to your
                WhatsApp within 24–48 hours — 100% free with zero obligation.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link
                href="/#free-personalized-demo"
                className="px-8 py-3.5 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#E52BFF] shadow-[0_0_30px_rgba(255,148,31,0.45)] hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Request Your Free Personalized Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demos"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#030B24] border border-[#00D9FF]/50 hover:bg-[#071638] transition-all"
              >
                Browse All 160+ Demos
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
