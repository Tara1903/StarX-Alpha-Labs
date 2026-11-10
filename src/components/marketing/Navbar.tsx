"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/LinkButton";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

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
    { label: "Services", href: "/services" },
    { label: "Divisions", href: "/divisions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
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
        {/* Brand Logo with STARX Star Mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-[#102D50] to-[#1769AA] border border-[#32A9E8]/50 flex items-center justify-center font-bold text-white shadow-lg shadow-[#1769AA]/30 group-hover:border-[#73D8FF] group-hover:shadow-[#32A9E8]/40 transition-all">
            <span className="text-[#73D8FF] font-extrabold text-sm">S</span>
            <span className="text-white font-extrabold text-sm">X</span>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#73D8FF] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
              STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">LABS</span>
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-1">
              Neural Engineering
            </span>
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
        <div className="hidden md:flex items-center gap-3">
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
