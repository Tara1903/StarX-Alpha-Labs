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
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, Mail, Phone, MapPin, ShieldAlert, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [division, setDivision] = React.useState("systems");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "staged">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Valid corporate email is required";
    if (!message.trim() || message.length < 15) errs.message = "Please provide at least 15 characters of project context";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate real network validation and local staging
    setTimeout(() => {
      setIsLoading(false);
      // Strictly honest staging notification — never fake a production database commit before Phase 5
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
              <Badge variant="electric" dot>Direct Channel</Badge>
              <h1 className="text-display font-extrabold text-white">
                Contact Our Architects.
              </h1>
              <p className="text-body text-slate-300">
                Connect directly with the engineering team at STARX LABS. We review requirements, conduct
                architectural assessments, and schedule technical consultations within 24 business hours.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0A1424]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-[#0F2038] border border-[#19375E] shadow-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Project Enquiry Form</h2>
                  <p className="text-xs text-slate-400">All submissions are handled with strict technical confidentiality.</p>
                </div>

                {submissionStatus === "staged" ? (
                  <div className="p-6 rounded-2xl bg-[#102D50] border border-[#32A9E8]/40 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Enquiry Validated & Staged Locally</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{fullName}</strong>. Your enquiry details for{" "}
                      <strong className="text-[#32A9E8]">{email}</strong> have passed client-side schema validation.
                    </p>
                    <div className="p-3 rounded-lg bg-[#0A1424] border border-[#19375E] flex items-start gap-2 text-[11px] text-slate-400">
                      <Info className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <span>
                        Notice: Live production database persistence and automated email dispatch will activate upon completion of
                        Phase 5 (Supabase Backend Integration). In the interim, you can also reach us directly at{" "}
                        <strong className="text-white">{SITE_CONFIG.contact.sales}</strong>.
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmissionStatus("idle")}
                      className="mt-2"
                    >
                      Submit Another Query
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Full Name"
                        required
                        htmlFor="contact-name"
                        error={errors.fullName}
                      >
                        <Input
                          id="contact-name"
                          placeholder="Your official name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          error={Boolean(errors.fullName)}
                        />
                      </FormField>

                      <FormField
                        label="Corporate Email"
                        required
                        htmlFor="contact-email"
                        error={errors.email}
                      >
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={Boolean(errors.email)}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Company Name" htmlFor="contact-company">
                        <Input
                          id="contact-company"
                          placeholder="Organization or brand name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </FormField>

                      <FormField label="Target Division" required htmlFor="contact-division">
                        <Select
                          id="contact-division"
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                          options={[
                            { label: "STARX SYSTEMS (Custom Software)", value: "systems" },
                            { label: "STARX DIGITAL (Web & E-Commerce)", value: "digital" },
                            { label: "STARX AI (Custom AI Architecture)", value: "ai" },
                            { label: "General Enterprise Inquiry", value: "general" },
                          ]}
                        />
                      </FormField>
                    </div>

                    <FormField
                      label="Project Description & Scope"
                      required
                      htmlFor="contact-message"
                      error={errors.message}
                      helperText="Summarize your goals, existing stack, and expected commencement timeline."
                    >
                      <Textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Provide details about your operational requirements or technical objectives..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={Boolean(errors.message)}
                      />
                    </FormField>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isLoading}
                      className="w-full justify-center"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Submit Technical Enquiry
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Column: Corporate Contacts */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-3xl bg-[#0F2038] border border-[#19375E] space-y-6">
                  <h3 className="text-lg font-bold text-white">Direct Enterprise Contacts</h3>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Solutions & Architecture:</span>
                        <a href={`mailto:${SITE_CONFIG.contact.sales}`} className="font-semibold text-white hover:text-[#32A9E8]">
                          {SITE_CONFIG.contact.sales}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Direct Telephone:</span>
                        <span className="font-semibold text-white">{SITE_CONFIG.contact.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Headquarters:</span>
                        <span className="font-semibold text-white leading-relaxed">
                          {SITE_CONFIG.contact.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#102D50] border border-[#19375E] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <ShieldAlert className="w-4 h-4 text-[#32A9E8]" />
                    <span>Non-Disclosure Agreements</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prior to receiving sensitive operational documentation or proprietary codebase access, STARX LABS will execute standard mutual Non-Disclosure Agreements upon request.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
