"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, CheckCircle2, Mail, ShieldAlert } from "lucide-react";

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
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0A1424] text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#32A9E8]/20 via-[#1769AA]/15 to-transparent blur-[120px] pointer-events-none" />

      <Container className="max-w-5xl">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1424] to-[#102D50] border border-[#19375E] shadow-2xl relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Badge variant="electric" dot>
              Commence Your Engagement
            </Badge>

            <Reveal direction="up" distance={15}>
              <h2 className="text-h2 font-extrabold text-white">
                Ready to Architect Your Next Digital Breakthrough?
              </h2>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.1}>
              <p className="text-body text-slate-300">
                Connect directly with our lead architects. We evaluate project scope, technical
                feasibility, and architectural requirements within 24 business hours.
              </p>
            </Reveal>

            {/* Quick Contact Form */}
            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#102D50] border border-[#32A9E8]/40 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-[#32A9E8] mx-auto" />
                <h3 className="text-lg font-bold text-white">Engagement Request Received</h3>
                <p className="text-xs text-slate-300">
                  An architectural advisor will review your specifications and contact {email} within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-left max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Work Email" required htmlFor="cta-email">
                    <Input
                      id="cta-email"
                      type="email"
                      required
                      placeholder="corporate@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                  </FormField>

                  <FormField label="Area of Interest" required htmlFor="cta-division">
                    <Select
                      id="cta-division"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      options={[
                        { label: "STARX SYSTEMS (Custom Apps)", value: "systems" },
                        { label: "STARX DIGITAL (Web & Commerce)", value: "digital" },
                        { label: "STARX AI (Custom AI Solutions)", value: "ai" },
                        { label: "Full Architecture Audit", value: "audit" },
                      ]}
                    />
                  </FormField>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="w-full justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Architecture Consultation
                </Button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#32A9E8]" />
                  <span>Strict confidentiality. Non-disclosure agreements provided upon request.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
