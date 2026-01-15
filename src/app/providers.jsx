"use client";

import { Suspense } from "react";

import { TranslationProvider } from "@/hooks/use-translation";

export function Providers({ children }) {
  console.log("FE Version: 1.0.17");

  return (
    <Suspense fallback={null}>
      <TranslationProvider>{children}</TranslationProvider>
    </Suspense>
  );
}
