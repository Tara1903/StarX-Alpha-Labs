"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/LinkButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Menu, X, ArrowUpRight, Sparkles, Globe, UserCheck, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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
    { label: "Services", href: "/services" },
    { label: "Divisions", href: "/divisions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Demos", href: "/demos", badge: "160" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-[#07111F]/90 backdrop-blur-xl border-[rgba(130,180,220,0.18)] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#07111F]/75 backdrop-blur-md border-[rgba(130,180,220,0.08)] shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with StarX Alpha Labs Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 select-none">
          <BrandLogo size="md" priority />
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none whitespace-nowrap">
              STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">ALPHA LABS</span>
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-1 whitespace-nowrap hidden md:block">
              Technology &amp; Software Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Streamlined & Uncluttered */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "bg-[#1769AA]/30 text-[#73D8FF] font-semibold border border-[#32A9E8]/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#1769AA]/40 text-[#73D8FF] border border-[#32A9E8]/30">
                    {link.badge}
                  </span>
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white bg-[#0B192B]/60 hover:bg-[#10243E] border border-[rgba(130,180,220,0.18)] transition-all"
            title="Toggle Language (English / Hindi)"
          >
            <Globe className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Client Portal Link */}
          <Link
            href="/customer"
            className="hidden xl:inline-flex text-xs font-medium text-slate-400 hover:text-[#73D8FF] px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Portal
          </Link>

          {/* Single High-Priority Action */}
          <LinkButton
            href="/get-quote"
            variant="primary"
            size="sm"
            className="whitespace-nowrap px-4 py-2 text-xs font-bold bg-gradient-to-r from-[#1769AA] to-[#32A9E8] hover:from-[#1b7bc7] hover:to-[#42b7f5] shadow-md shadow-[#1769AA]/30 border border-[#73D8FF]/30"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-white" />}
          >
            Start Project
          </LinkButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/80 text-slate-200 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Flush Below Header) */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-b border-[rgba(130,180,220,0.16)] bg-[#07111F]/95 backdrop-blur-2xl px-6 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(130,180,220,0.14)]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#73D8FF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" /> Navigation
            </span>
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-slate-300 bg-[#0B192B] border border-slate-700/60"
            >
              <Globe className="w-3.5 h-3.5 text-[#73D8FF]" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#1769AA]/30 text-[#73D8FF] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#1769AA]/40 text-[#73D8FF]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[rgba(130,180,220,0.1)] flex items-center gap-3">
              <Link
                href="/customer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2 px-3 text-xs text-slate-300 hover:text-white"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#73D8FF]" />
                <span>Customer Portal</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2 px-3 text-xs text-slate-400 hover:text-white"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin Login</span>
              </Link>
            </div>
          </nav>

          <div className="pt-3 border-t border-[rgba(130,180,220,0.14)] flex flex-col sm:flex-row gap-2.5">
            <LinkButton
              href="/get-quote"
              variant="outline"
              size="md"
              className="w-full text-center justify-center text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </LinkButton>
            <LinkButton
              href="/book-consultation"
              variant="primary"
              size="md"
              className="w-full text-center justify-center text-xs bg-gradient-to-r from-[#1769AA] to-[#32A9E8]"
              onClick={() => setMobileMenuOpen(false)}
              rightIcon={<ArrowUpRight className="w-4 h-4 text-white" />}
            >
              Book Consultation
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
