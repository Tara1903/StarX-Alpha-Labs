"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export function FinalCTA() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [division, setDivision] = React.useState("systems");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-12 sm:py-14 md:py-16 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1769AA]/20 via-[#32A9E8]/20 to-[#73D8FF]/15 blur-[160px] pointer-events-none -z-10" />

      <Container className="max-w-5xl">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl glass-panel relative overflow-hidden border-[rgba(130,180,220,0.22)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#102D50]/60 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
                Direct Engineering Engagement
              </span>
            </div>

            <Reveal direction="up" distance={15}>
              <h2 className="text-display font-extrabold text-white tracking-tight leading-[1.05]">
                Have an idea worth engineering?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#73D8FF] to-[#32A9E8]">
                  Let&apos;s turn it into something real.
                </span>
              </h2>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.1}>
              <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light leading-relaxed">
                Connect directly with our lead architects. We evaluate technical feasibility,
                system architecture, and execution timelines within 24 business hours.
              </p>
            </Reveal>

            {/* Quick Consultation Form */}
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#0B192B]/90 border border-[#73D8FF]/40 text-center space-y-3 animate-in fade-in max-w-lg mx-auto shadow-2xl">
                <CheckCircle2 className="w-10 h-10 text-[#73D8FF] mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">Engagement Request Received</h3>
                <p className="text-xs text-[#A3B4C7]">
                  An architectural director will review your inquiry and follow up at <strong className="text-white">{email}</strong> within 24 hours.
                </p>
                <div className="pt-3 border-t border-[rgba(130,180,220,0.14)] text-[11px] font-mono text-amber-300/90 flex items-center justify-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Local Staging Active — Form recorded ahead of Phase 5 Supabase lead persistence.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 max-w-xl mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your corporate email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-13 bg-[#07111F]/80 border-[rgba(130,180,220,0.25)] text-white placeholder:text-slate-400 rounded-xl focus:border-[#73D8FF] text-sm"
                  />
                  <Select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    options={[
                      { value: "digital", label: "STARX Digital (Web & E-Com)" },
                      { value: "systems", label: "STARX Systems (Software)" },
                      { value: "ai", label: "STARX AI (Intelligent Apps)" },
                      { value: "general", label: "Comprehensive Architecture" },
                    ]}
                    className="h-13 bg-[#07111F]/80 border-[rgba(130,180,220,0.25)] text-white rounded-xl focus:border-[#73D8FF] text-xs sm:w-56"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="w-full h-13 rounded-xl font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-[#1769AA] via-[#32A9E8] to-[#73D8FF] text-[#07111F] hover:brightness-110 shadow-lg shadow-[#32A9E8]/25 transition-all"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#07111F]" />}
                >
                  Request Architectural Consultation
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#73D8FF]" />
                  <span>Strict NDA Protected • Zero Spam Guarantee</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
