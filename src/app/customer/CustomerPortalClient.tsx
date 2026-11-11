"use client";

import React, { Suspense } from "react";
import { CustomerPortalMaster } from "@/components/customer/CustomerPortalMaster";

export function CustomerPortalClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030B24] flex items-center justify-center text-[#00D9FF] font-mono text-xs animate-pulse">
          LOADING CLIENT WORKSPACE...
        </div>
      }
    >
      <CustomerPortalMaster />
    </Suspense>
  );
}
