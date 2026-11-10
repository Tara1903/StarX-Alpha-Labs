"use client";

import * as React from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, CheckCircle2, DollarSign, Info, ShieldCheck } from "lucide-react";

export default function GetQuotePage() {
  const [selectedService, setSelectedService] = React.useState("custom-software");
  const [budgetRange, setBudgetRange] = React.useState("$5,000 - $15,000");
  const [timeline, setTimeline] = React.useState("4 - 8 Weeks");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "staged">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Valid corporate email is required";
    if (!notes.trim() || notes.length < 15) errs.notes = "Please provide at least 15 characters describing your requirements";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmissionStatus("staged");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Project Estimator</Badge>
              <h1 className="text-display font-extrabold text-white">
                Request an Itemized Proposal.
              </h1>
              <p className="text-body text-slate-300">
                Configure your project scope, target timeline, and budget parameters below.
                Our solutions team will deliver a structured architecture blueprint and milestone cost estimate.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0A1424]">
          <Container className="max-w-4xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0F2038] border border-[#19375E] shadow-2xl space-y-8">
              {submissionStatus === "staged" ? (
                <div className="p-8 rounded-2xl bg-[#102D50] border border-[#32A9E8]/40 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span>Quote Configuration Validated & Staged</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>. Your requested estimate for{" "}
                    <strong className="text-[#32A9E8]">{selectedService}</strong> ({budgetRange}) has been validated.
                  </p>
                  <div className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-2.5 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-[#32A9E8] shrink-0 mt-0.5" />
                    <span>
                      Notice: Live database persistence and automated proposal generation will be connected in Phase 5
                      (Supabase Backend). Our architects review staged configurations regularly during active sprints.
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmissionStatus("idle")}
                    className="mt-2"
                  >
                    Configure Another Scope
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Scope Configuration */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white border-b border-[#19375E] pb-2">
                      1. Project Scope & Architecture
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField label="Primary Service" required htmlFor="quote-service">
                        <Select
                          id="quote-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          options={SERVICES_DATA.map((s) => ({
                            label: s.title,
                            value: s.slug,
                          }))}
                        />
                      </FormField>

                      <FormField label="Budget Range" required htmlFor="quote-budget">
                        <Select
                          id="quote-budget"
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          options={[
                            { label: "$2,000 – $5,000", value: "$2,000 - $5,000" },
                            { label: "$5,000 – $15,000", value: "$5,000 - $15,000" },
                            { label: "$15,000 – $35,000", value: "$15,000 - $35,000" },
                            { label: "$35,000+", value: "$35,000+" },
                          ]}
                        />
                      </FormField>

                      <FormField label="Target Delivery" required htmlFor="quote-timeline">
                        <Select
                          id="quote-timeline"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          options={[
                            { label: "Immediate (Under 3 weeks)", value: "Under 3 weeks" },
                            { label: "Standard (4 – 8 Weeks)", value: "4 - 8 Weeks" },
                            { label: "Comprehensive (8 – 16 Weeks)", value: "8 - 16 Weeks" },
                            { label: "Flexible", value: "Flexible" },
                          ]}
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white border-b border-[#19375E] pb-2">
                      2. Commercial Contact
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField label="Full Name" required htmlFor="quote-name" error={errors.fullName}>
                        <Input
                          id="quote-name"
                          placeholder="Your official name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          error={Boolean(errors.fullName)}
                        />
                      </FormField>

                      <FormField label="Corporate Email" required htmlFor="quote-email" error={errors.email}>
                        <Input
                          id="quote-email"
                          type="email"
                          placeholder="corporate@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={Boolean(errors.email)}
                        />
                      </FormField>

                      <FormField label="Company Name" htmlFor="quote-company">
                        <Input
                          id="quote-company"
                          placeholder="Brand or entity name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* Requirements Brief */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white border-b border-[#19375E] pb-2">
                      3. Requirements & Constraints
                    </h2>
                    <FormField
                      label="Technical Brief"
                      required
                      htmlFor="quote-notes"
                      error={errors.notes}
                      helperText="Detail key functional requirements, integrations, or specific compliance criteria."
                    >
                      <Textarea
                        id="quote-notes"
                        rows={4}
                        placeholder="Detail the technical workflows, intended users, and key features..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        error={Boolean(errors.notes)}
                      />
                    </FormField>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full justify-center"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request Itemized Proposal & Architecture Review
                  </Button>
                </form>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
