"use client";

import { TranslationProvider } from "@/hooks/use-translation";

export function Providers({ children }) {
  console.log("FE Version: 1.0.17");

  return <TranslationProvider>{children}</TranslationProvider>;
}
