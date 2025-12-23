"use client";

import { Suspense } from "react";
import { TranslationProvider } from "@/hooks/use-translation";
import LoadingStatic from "@/components/Loading/LoadingStatic";

export function Providers({ children }) {
  return (
    <Suspense fallback={<LoadingStatic />}>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </Suspense>
  );
}