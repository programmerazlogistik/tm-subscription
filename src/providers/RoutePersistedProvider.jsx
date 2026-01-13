"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ROUTE_STORAGE_KEY = "tm-subscription-current-route";
const RELOAD_FLAG_KEY = "tm-subscription-is-reload";

export const RoutePersistedProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRestored = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Listen for postMessage from parent page
  useEffect(() => {
    const handleMessage = (event) => {
      // Security: You can add origin check here if needed
      // if (event.origin !== 'https://tm-az.assetlogistik.com') return;

      if (event.data?.type === "PARENT_RELOAD") {
        // Parent is reloading - mark that we should restore route
        sessionStorage.setItem(RELOAD_FLAG_KEY, "true");
      } else if (event.data?.type === "PARENT_FRESH_LOAD") {
        // Parent is fresh load (not reload) - clear saved route
        sessionStorage.removeItem(ROUTE_STORAGE_KEY);
        sessionStorage.removeItem(RELOAD_FLAG_KEY);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Restore route on initial load
  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;

    const savedRoute = sessionStorage.getItem(ROUTE_STORAGE_KEY);
    const isReload = sessionStorage.getItem(RELOAD_FLAG_KEY) === "true";

    // Clear the reload flag after reading
    sessionStorage.removeItem(RELOAD_FLAG_KEY);

    console.warn("[RoutePersistedProvider] Decision:", {
      savedRoute,
      currentPath: pathname,
      isReload,
    });

    if (savedRoute && savedRoute !== pathname && isReload) {
      console.warn("[RoutePersistedProvider] ✅ Restoring route:", savedRoute);
      router.replace(savedRoute);
    } else {
      if (!isReload && savedRoute) {
        console.warn(
          "[RoutePersistedProvider] ❌ Fresh navigation - clearing saved route"
        );
        sessionStorage.removeItem(ROUTE_STORAGE_KEY);
      }
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
