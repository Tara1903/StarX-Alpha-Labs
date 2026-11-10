"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-[#19375E]/80 bg-[#0A1424]/90 backdrop-blur-md transition-all">
      <Container className="h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#102D50] to-[#1769AA] border border-[#32A9E8]/40 flex items-center justify-center font-bold text-white shadow-md shadow-[#32A9E8]/20 group-hover:border-[#32A9E8] transition-all">
            <span className="text-[#32A9E8]">S</span>X
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white leading-none">
              STARX <span className="text-[#32A9E8]">LABS</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">
              Digital Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-[#32A9E8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LinkButton href="/get-quote" variant="outline" size="sm">
            Get Quote
          </LinkButton>
          <LinkButton href="/contact" variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            Start Project
          </LinkButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-[#19375E] bg-[#0F2038] text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#19375E] bg-[#0A1424] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#32A9E8] py-2 border-b border-[#19375E]/40"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <LinkButton
              href="/get-quote"
              variant="outline"
              size="md"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Quote
            </LinkButton>
            <LinkButton
              href="/contact"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a Project
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
