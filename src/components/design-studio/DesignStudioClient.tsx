"use client";

import React, { Suspense } from "react";
import { DesignStudioProvider, useDesignStudio } from "./context/DesignStudioContext";
import { ChapterProgressNav } from "./ui/ChapterProgressNav";

// Chapter 1 Steps
import { Step1Account } from "./steps/chapter1/Step1Account";
import { Step2Profile } from "./steps/chapter1/Step2Profile";
import { Step3Division } from "./steps/chapter1/Step3Division";
import { Step4Industry } from "./steps/chapter1/Step4Industry";

// Chapter 2 Steps
import { Step5Solution } from "./steps/chapter2/Step5Solution";
import { Step6Platform } from "./steps/chapter2/Step6Platform";
import { Step7Idea } from "./steps/chapter2/Step7Idea";
import { Step8Users } from "./steps/chapter2/Step8Users";
import { Step9Features } from "./steps/chapter2/Step9Features";
import { Step10Integrations } from "./steps/chapter2/Step10Integrations";
import { Step11Scale } from "./steps/chapter2/Step11Scale";
import { Step12Confirmation } from "./steps/chapter2/Step12Confirmation";

// Chapter 3 Steps
import { Step13Plans } from "./steps/chapter3/Step13Plans";
import { Step14Config } from "./steps/chapter3/Step14Config";

// Chapter 4 Steps
import { Step15Personalise } from "./steps/chapter4/Step15Personalise";
import { Step16BlueprintGenerate } from "./steps/chapter4/Step16BlueprintGenerate";

// Post-Onboarding Workspace
import { DemoWorkspace } from "./workspace/DemoWorkspace";

function DesignStudioContent() {
  const { state } = useDesignStudio();

  // If generation is complete and artifact exists, show Demo Workspace
  if (state.activeArtifact && !state.isGenerating && state.currentStep === 16) {
    return <DemoWorkspace />;
  }

  // Active step renderer
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Account />;
      case 2:
        return <Step2Profile />;
      case 3:
        return <Step3Division />;
      case 4:
        return <Step4Industry />;
      case 5:
        return <Step5Solution />;
      case 6:
        return <Step6Platform />;
      case 7:
        return <Step7Idea />;
      case 8:
        return <Step8Users />;
      case 9:
        return <Step9Features />;
      case 10:
        return <Step10Integrations />;
      case 11:
        return <Step11Scale />;
      case 12:
        return <Step12Confirmation />;
      case 13:
        return <Step13Plans />;
      case 14:
        return <Step14Config />;
      case 15:
        return <Step15Personalise />;
      case 16:
        return <Step16BlueprintGenerate />;
      default:
        return <Step1Account />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-slate-100 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tl from-purple-600/10 via-pink-600/5 to-transparent blur-[140px] pointer-events-none -z-10"
      />

      {/* Persistent 4-Chapter 16-Step Navigation Header */}
      <ChapterProgressNav />

      {/* Main Step Interaction Surface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderStep()}
      </main>
    </div>
  );
}

export function DesignStudioClient() {
  return (
    <DesignStudioProvider>
      <DesignStudioContent />
    </DesignStudioProvider>
  );
}
