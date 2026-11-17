import { Metadata } from "next";
import { Suspense } from "react";
import { DesignStudioClient } from "@/components/design-studio/DesignStudioClient";

export const metadata: Metadata = {
  title: "StarX Design Studio | AI-Assisted Digital Product Scoping & Prototyping",
  description:
    "Collaborate with StarX Alpha Labs in our interactive Design Studio. Describe your vision, generate high-fidelity UI concepts powered by Google Stitch AI, refine your specifications, and obtain an instant engineering scope.",
  keywords: [
    "StarX Design Studio",
    "digital product scoping",
    "AI prototyping",
    "Google Stitch UI design",
    "custom software design",
    "software engineering scope",
  ],
};

export default function DesignStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020208] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-mono text-sm tracking-wider uppercase">
              Loading StarX Design Studio...
            </p>
          </div>
        </div>
      }
    >
      <DesignStudioClient />
    </Suspense>
  );
}
