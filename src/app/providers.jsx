"use client";

import { Suspense } from "react";

import LoadingStatic from "@/components/Loading/LoadingStatic";

import { TranslationProvider } from "@/hooks/use-translation";

export function Providers({ children }) {
  console.log("FE Version: 1.0.6");

  return (
    <Suspense fallback={<LoadingStatic />}>
      <TranslationProvider>{children}</TranslationProvider>
    </Suspense>
  );
}
