"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/LinkButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Menu, X, ArrowUpRight, Sparkles, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 30;
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

  const navLinks = [
    { label: "160 Demos", href: "/demos", highlight: true },
    { label: "Services", href: "/services" },
    { label: "Divisions", href: "/divisions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Customer Portal", href: "/customer" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-3 sm:pt-4 px-3 sm:px-6">
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between border",
          scrolled
            ? "bg-[#07111F]/80 backdrop-blur-xl border-[rgba(130,180,220,0.22)] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
            : "bg-[#07111F]/40 backdrop-blur-md border-[rgba(130,180,220,0.12)] shadow-none"
        )}
      >
        {/* Brand Logo with StarX Alpha Labs Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 select-none">
          <BrandLogo size="md" priority />
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight whitespace-nowrap">
              STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">ALPHA LABS</span>
            </div>
            <div className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-0.5 whitespace-nowrap hidden sm:block">
              Technology &amp; Software Engineering
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#0B192B]/50 border border-[rgba(130,180,220,0.14)] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#1769AA]/40 text-[#73D8FF] border border-[#32A9E8]/40 shadow-sm shadow-[#32A9E8]/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Toggle */}
          <div className="flex items-center bg-[#0B192B]/80 border border-[#173863] rounded-full p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                language === "en" ? "bg-[#1769AA] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                language === "hi" ? "bg-[#1769AA] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              HI
            </button>
          </div>

          <Link
            href="/admin"
            className="text-[11px] font-mono text-slate-400 hover:text-[#73D8FF] px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            Admin
          </Link>

          <LinkButton
            href="/get-quote"
            variant="ghost"
            size="sm"
            className="text-xs font-semibold tracking-wider text-slate-300 hover:text-white"
          >
            Get Quote
          </LinkButton>
          <LinkButton
            href="/contact"
            variant="primary"
            size="sm"
            className="text-xs font-semibold tracking-wider bg-gradient-to-r from-[#1769AA] to-[#32A9E8] hover:from-[#1b7bc7] hover:to-[#42b7f5] shadow-lg shadow-[#1769AA]/30 border border-[#73D8FF]/30"
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
          className="lg:hidden p-2.5 rounded-xl border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/80 text-slate-200 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(130,180,220,0.14)]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#73D8FF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" /> Directory Navigation
            </span>
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 px-3 rounded-xl transition-all",
                    isActive
                      ? "bg-[#1769AA]/30 text-[#73D8FF] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[rgba(130,180,220,0.14)] flex flex-col sm:flex-row gap-3">
            <LinkButton
              href="/get-quote"
              variant="outline"
              size="md"
              className="w-full text-center justify-center text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </LinkButton>
            <LinkButton
              href="/contact"
              variant="primary"
              size="md"
              className="w-full text-center justify-center text-xs bg-gradient-to-r from-[#1769AA] to-[#32A9E8]"
              onClick={() => setMobileMenuOpen(false)}
              rightIcon={<ArrowUpRight className="w-4 h-4 text-white" />}
            >
              Start Project
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
