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
import { ArrowRight, Phone, MapPin, ShieldAlert, CheckCircle2, AlertCircle, Info, MessageSquare, ExternalLink, User } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [division, setDivision] = React.useState("systems");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = React.useState("");
  const [enquiryId, setEnquiryId] = React.useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Valid corporate email is required";
    if (!message.trim() || message.length < 15) errs.message = "Please provide at least 15 characters of project context";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmissionStatus("idle");
    setSubmissionMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          company,
          division,
          message,
          sourcePage: "/contact",
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok && data.success) {
        setSubmissionStatus("success");
        setSubmissionMessage(data.message || "Your enquiry has been securely logged.");
        if (data.enquiryId) setEnquiryId(data.enquiryId);
      } else {
        setSubmissionStatus("error");
        setSubmissionMessage(data.message || "Unable to submit enquiry. Please try again.");
      }
    } catch {
      setIsLoading(false);
      setSubmissionStatus("error");
      setSubmissionMessage("Network error communicating with the backend. Please check your connectivity.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Direct Channel</Badge>
              <h1 className="text-display font-extrabold text-white">
                Contact Our Architects.
              </h1>
              <p className="text-body text-slate-300">
                Connect directly with the engineering team at StarX Alpha Labs. We review requirements, conduct
                architectural assessments, and schedule technical consultations within 24 business hours.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#07111F]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] shadow-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Project Enquiry Form</h2>
                  <p className="text-xs text-slate-400">All submissions are handled with strict technical confidentiality.</p>
                </div>

                {submissionStatus === "success" ? (
                  <div className="p-6 rounded-2xl bg-[#102D50] border border-emerald-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Enquiry Securely Persisted</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{fullName}</strong>. Your enquiry details have been committed to the
                      StarX Alpha Labs database. Reference ID: <code className="text-[#73D8FF] font-mono text-[11px] bg-[#07111F] px-1.5 py-0.5 rounded">{enquiryId || "LOGGED"}</code>
                    </p>
                    <div className="p-3 rounded-lg bg-[#07111F] border border-[rgba(130,180,220,0.18)] flex items-start gap-2 text-[11px] text-slate-400">
                      <Info className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <span>{submissionMessage}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmissionStatus("idle");
                        setFullName("");
                        setEmail("");
                        setCompany("");
                        setMessage("");
                      }}
                      className="mt-2"
                    >
                      Submit Another Query
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submissionStatus === "error" && (
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{submissionMessage}</span>
                      </div>
                    )}
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
                <div className="p-8 rounded-3xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] space-y-6">
                  <h3 className="text-lg font-bold text-white">Direct Enterprise Contacts</h3>

                  <div className="space-y-5 text-xs">
                    {/* Leadership & Founder */}
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Engineering Leadership:</span>
                        <span className="font-semibold text-white">
                          {SITE_CONFIG.founder.name} — {SITE_CONFIG.founder.designation}
                        </span>
                      </div>
                    </div>

                    {/* Direct Telephone */}
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Direct Telephone:</span>
                        <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-[#00D9FF]">
                          {SITE_CONFIG.contact.phone}
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp Enterprise Channel */}
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-[#00DF89] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">WhatsApp Priority Channel:</span>
                        <a
                          href={SITE_CONFIG.contact.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#00DF89] hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>Connect on WhatsApp ({SITE_CONFIG.contact.whatsapp})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Physical Headquarters */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block font-mono">Engineering Headquarters:</span>
                        <span className="font-semibold text-white leading-relaxed">
                          {SITE_CONFIG.contact.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#102D50] border border-[rgba(130,180,220,0.18)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <ShieldAlert className="w-4 h-4 text-[#32A9E8]" />
                    <span>Non-Disclosure Agreements</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prior to receiving sensitive operational documentation or proprietary codebase access, StarX Alpha Labs will execute standard mutual Non-Disclosure Agreements upon request.
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
