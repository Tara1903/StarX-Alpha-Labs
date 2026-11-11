"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/LinkButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Menu, X, ArrowUpRight, Sparkles, Globe, Calculator, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { label: string; href: string; badge?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Solutions ▾", href: "/development-services" },
    { label: "Demo Center", href: "/demos", badge: "160+" },
    { label: "STARX FLOW", href: "/#flow", badge: "AI OS" },
    { label: "Video Station", href: "/video-station", badge: "Live" },
    { label: "Pricing", href: "/pricing" },
    { label: "Industries ▾", href: "/industries" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Company ▾", href: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-[#030B24]/90 backdrop-blur-xl border-[#0A1940] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#030B24]/80 backdrop-blur-md border-white/5 shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with StarX Alpha Labs Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 select-none">
          <BrandLogo size="md" priority />
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none whitespace-nowrap">
              STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#087BFF]">ALPHA LABS</span>
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#00D9FF] mt-1 whitespace-nowrap hidden md:block">
              Build Smarter. Lead Tomorrow.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Streamlined & Uncluttered */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "text-[#00D9FF] font-semibold bg-[#087BFF]/15"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#087BFF]/30 text-[#00D9FF] border border-[#00D9FF]/30">
                    {link.badge}
                  </span>
                )}
                {/* Cyan active navigation underline indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] rounded-full shadow-[0_0_8px_#00D9FF]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions — Balanced & Clean */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Minimal Language Switch */}
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white bg-[#071638] hover:bg-[#0A1940] border border-[#087BFF]/30 transition-all cursor-pointer"
            title="Toggle Language (English / Hindi)"
          >
            <Globe className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>{language.toUpperCase()} ▾</span>
          </button>

          {/* Client Portal Link */}
          <Link
            href="/customer"
            className="hidden xl:inline-flex text-xs font-medium text-slate-400 hover:text-[#00D9FF] px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Portal
          </Link>

          {/* Single High-Priority Action — Get Free Quote */}
          <LinkButton
            href="/project-calculator"
            variant="primary"
            size="sm"
            className="whitespace-nowrap px-4 py-2 text-xs font-extrabold bg-gradient-to-r from-[#E52BFF] via-[#FF35B8] to-[#087BFF] hover:brightness-110 text-white shadow-[0_0_20px_rgba(229,43,255,0.4)] border border-[#E52BFF]/50 rounded-full"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-white" />}
          >
            Get Free Quote
          </LinkButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl border border-white/10 bg-[#071638] text-slate-200 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Flush Below Header) */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-b border-[#0A1940] bg-[#030B24]/95 backdrop-blur-2xl px-6 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#087BFF]/20 text-[#00D9FF] font-semibold border border-[#00D9FF]/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#087BFF]/30 text-[#00D9FF]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <a
              href={getStarxFlowDestinationUrl({ source: "starx_alpha_labs", campaign: "mobile_drawer" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#00D9FF] bg-[#071638] border border-[#00D9FF]/30 hover:bg-[#0A1940] transition-colors"
            >
              <span>STARX FLOW (AI OS)</span>
              <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 bg-[#071638] border border-white/10"
              >
                <Globe className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Language: {language === "en" ? "English" : "हिन्दी"}</span>
              </button>

              <Link
                href="/customer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-300 hover:text-white"
              >
                Client Portal →
              </Link>
            </div>

            <LinkButton
              href="/project-calculator"
              variant="primary"
              size="md"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center text-xs font-bold bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white py-3 rounded-xl shadow-lg"
            >
              Get Free Quote
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
