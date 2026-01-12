"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ROUTE_STORAGE_KEY = "tm-subscription-current-route";

export const RoutePersistedProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRestored = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Restore route on initial load
  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;

    const savedRoute = sessionStorage.getItem(ROUTE_STORAGE_KEY);
    if (savedRoute && savedRoute !== pathname) {
      router.replace(savedRoute);
    } else {
      setIsReady(true);
    }
  }, [router, pathname]);

  // Set ready after navigation completes
  useEffect(() => {
    if (hasRestored.current) {
      setIsReady(true);
    }
  }, [pathname]);

  // Save current route on every navigation
  useEffect(() => {
    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    sessionStorage.setItem(ROUTE_STORAGE_KEY, fullPath);
  }, [pathname, searchParams]);

  // Show loading while redirecting
  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
      </div>
    );
  }

  return children;
};
