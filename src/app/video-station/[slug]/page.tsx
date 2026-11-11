import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import {
  VIDEO_ITEMS,
  getVideoBySlug,
  getVideosByCategory,
} from "@/data/videos";
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Tv,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  ExternalLink
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VIDEO_ITEMS.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return { title: "Video Not Found" };

  return {
    title: `${video.title} — StarX Video Station`,
    description: video.description,
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = getVideosByCategory(video.categoryId)
    .filter((v) => v.id !== video.id)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello StarX Alpha Labs! I watched your video demonstration "${video.title}" and would like to explore this solution for my business.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-32 pb-24 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#00D9FF]/15 via-[#087BFF]/10 to-transparent blur-[160px] pointer-events-none -z-10" />

        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/video-station" className="hover:text-white">Video Station</Link>
            <span>/</span>
            <span className="text-[#00D9FF] truncate max-w-xs">{video.categoryTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Column: Video Player & Overview */}
            <div className="lg:col-span-8 space-y-8">
              {/* Responsive 16:9 Video Player */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#071638] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                {video.videoType === "youtube" ? (
                  <iframe
                    src={`${video.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={video.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Video Title & Meta Bar */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00D9FF]/15 border border-[#00D9FF]/40 text-[#00D9FF]">
                    {video.categoryTitle}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Duration: {video.durationText}</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-400">
                    Language: {video.language}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {video.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Core Features Breakdown */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                  <span>Key Architecture &amp; Capabilities Demonstrated</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {video.features.map((feat) => (
                    <div
                      key={feat}
                      className="p-3.5 rounded-xl bg-[#030B24] border border-white/5 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00DF89] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo Link (if connected) */}
              {video.relatedDemoSlug && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-[#071638] to-[#0A1F4D] border border-[#00D9FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[11px] font-mono text-[#00D9FF] font-bold uppercase tracking-wider">
                      Interactive Sandbox Available
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Explore the Live Demo: {video.relatedDemoName}
                    </h3>
                  </div>

                  <Link
                    href={`/demos/${video.relatedDemoSlug}`}
                    className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#00D9FF] hover:bg-[#00c5e6] text-[#030B24] transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Launch Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar: Free Demo Conversion & Direct WhatsApp Contact */}
            <div className="lg:col-span-4 space-y-8">
              {/* Primary Call to Action Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#071638] to-[#030B24] border-2 border-[#00D9FF]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
                <div className="space-y-2 text-center">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#00D9FF] uppercase">
                    Get This For Your Business
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    Request a Personalized Demo
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our team will build an interactive working preview customized with your brand name, services, and requirements.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/#free-personalized-demo"
                    className="w-full py-3.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#E52BFF] shadow-[0_0_25px_rgba(255,148,31,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Free Demo Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/919660937033?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full font-bold text-xs text-[#030B24] bg-[#00DF89] hover:bg-[#00c97b] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Discuss on WhatsApp (+91 9660937033)</span>
                  </a>

                  <a
                    href="tel:+919660937033"
                    className="w-full py-2.5 rounded-full font-mono text-xs text-slate-300 bg-[#030B24] border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Call Direct: +91 9660937033</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00DF89]" />
                    <span>100% Free • No Obligation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Delivered in 24–48 Hours</span>
                  </div>
                </div>
              </div>

              {/* Related Videos in Category */}
              {relatedVideos.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Related {video.categoryTitle} Demos
                  </h3>

                  <div className="space-y-4">
                    {relatedVideos.map((rv) => (
                      <Link
                        key={rv.id}
                        href={`/video-station/${rv.slug}`}
                        className="block p-3 rounded-2xl bg-[#030B24] border border-white/5 hover:border-[#00D9FF]/40 transition-all group"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-[#00D9FF] line-clamp-2 transition-colors">
                          {rv.title}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-1">
                          <span>{rv.durationText}</span>
                          <span>•</span>
                          <span>{rv.language}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
