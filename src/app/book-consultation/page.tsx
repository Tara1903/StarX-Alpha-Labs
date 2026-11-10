"use client";

import * as React from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { ArrowRight, Calendar, CheckCircle2, Clock, Info, ShieldCheck } from "lucide-react";

export default function BookConsultationPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [topic, setTopic] = React.useState("systems_architecture");
  const [preferredDate, setPreferredDate] = React.useState("");
  const [timeSlot, setTimeSlot] = React.useState("14:00 - 15:00 UTC");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "staged">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Valid corporate email is required";
    if (!preferredDate) errs.preferredDate = "Please choose a preferred consultation date";
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
              <Badge variant="corporate" dot>Advisory Session</Badge>
              <h1 className="text-display font-extrabold text-white">
                Book an Architecture Consultation.
              </h1>
              <p className="text-body text-slate-300">
                A 45-minute technical deep-dive with our senior solutions architect to evaluate feasibility,
                system architecture, database choices, and project roadmaps.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0A1424]">
          <Container className="max-w-3xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0F2038] border border-[#19375E] shadow-2xl space-y-6">
              {submissionStatus === "staged" ? (
                <div className="p-8 rounded-2xl bg-[#102D50] border border-[#32A9E8]/40 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span>Consultation Slot Request Validated & Staged</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>. Your requested consultation for{" "}
                    <strong className="text-[#32A9E8]">{preferredDate}</strong> at{" "}
                    <strong className="text-white">{timeSlot}</strong> has been validated.
                  </p>
                  <div className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-2.5 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-[#32A9E8] shrink-0 mt-0.5" />
                    <span>
                      Notice: Calendar invitation synchronization and automated Google Meet / Zoom link generation will be connected in
                      Phase 5 (Supabase Backend + Consultation Webhooks).
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmissionStatus("idle")}
                    className="mt-2"
                  >
                    Select Another Date
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Full Name" required htmlFor="book-name" error={errors.fullName}>
                      <Input
                        id="book-name"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={Boolean(errors.fullName)}
                      />
                    </FormField>

                    <FormField label="Corporate Email" required htmlFor="book-email" error={errors.email}>
                      <Input
                        id="book-email"
                        type="email"
                        placeholder="corporate@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(errors.email)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Phone / WhatsApp" htmlFor="book-phone">
                      <Input
                        id="book-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Consultation Focus" required htmlFor="book-topic">
                      <Select
                        id="book-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        options={[
                          { label: "Systems Architecture & DB Design", value: "systems_architecture" },
                          { label: "High-Performance Web & Commerce", value: "web_commerce" },
                          { label: "Proprietary AI & RAG Feasibility", value: "ai_feasibility" },
                          { label: "Legacy Replatforming & Migration", value: "replatforming" },
                        ]}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Preferred Date" required htmlFor="book-date" error={errors.preferredDate}>
                      <Input
                        id="book-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        error={Boolean(errors.preferredDate)}
                      />
                    </FormField>

                    <FormField label="Time Window" required htmlFor="book-slot">
                      <Select
                        id="book-slot"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        options={[
                          { label: "09:00 – 10:00 UTC", value: "09:00 - 10:00 UTC" },
                          { label: "12:00 – 13:00 UTC", value: "12:00 - 13:00 UTC" },
                          { label: "14:00 – 15:00 UTC", value: "14:00 - 15:00 UTC" },
                          { label: "17:00 – 18:00 UTC", value: "17:00 - 18:00 UTC" },
                        ]}
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
                    Confirm Consultation Slot
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
