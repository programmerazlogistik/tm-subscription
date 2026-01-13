"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ROUTE_STORAGE_KEY = "tm-subscription-current-route";
const PARENT_MESSAGE_TIMEOUT = 300; // Wait up to 300ms for parent message

// Detect if this is a reload using browser's navigation API
function detectReloadFromBrowser() {
  try {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0) {
      return navEntries[0].type === "reload";
    }
  } catch (e) {
    // Fallback for older browsers
    if (performance.navigation) {
      return performance.navigation.type === 1;
    }
  }
  return false;
}

export const RoutePersistedProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRestored = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const parentMessageReceived = useRef(false);
  const isReloadRef = useRef(false);

  // Wait for parent message with timeout
  const waitForParentMessage = useCallback(() => {
    return new Promise((resolve) => {
      const handleMessage = (event) => {
        if (event.data?.type === "PARENT_RELOAD") {
          parentMessageReceived.current = true;
          isReloadRef.current = true;
          console.warn("[RoutePersistedProvider] Received: PARENT_RELOAD");
          window.removeEventListener("message", handleMessage);
          resolve(true);
        } else if (event.data?.type === "PARENT_FRESH_LOAD") {
          parentMessageReceived.current = true;
          isReloadRef.current = false;
          console.warn("[RoutePersistedProvider] Received: PARENT_FRESH_LOAD");
          window.removeEventListener("message", handleMessage);
          resolve(false);
        }
      };

      window.addEventListener("message", handleMessage);

      // Timeout fallback - use browser's reload detection
      setTimeout(() => {
        if (!parentMessageReceived.current) {
          const isReload = detectReloadFromBrowser();
          console.warn(
            "[RoutePersistedProvider] No parent message, using browser detection. isReload:",
            isReload
          );
          window.removeEventListener("message", handleMessage);
          resolve(isReload);
        }
      }, PARENT_MESSAGE_TIMEOUT);
    });
  }, []);

  // Restore route on initial load - wait for parent message first
  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;

    const doRestore = async () => {
      const savedRoute = sessionStorage.getItem(ROUTE_STORAGE_KEY);

      // Wait for parent to tell us if this is a reload
      const isReload = await waitForParentMessage();

      console.warn("[RoutePersistedProvider] Decision:", {
        savedRoute,
        currentPath: pathname,
        isReload,
      });

      if (savedRoute && savedRoute !== pathname && isReload) {
        console.warn(
          "[RoutePersistedProvider] ✅ Restoring route:",
          savedRoute
        );
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
    };

    doRestore();
  }, [router, pathname, waitForParentMessage]);

  // Set ready after navigation completes
  useEffect(() => {
    if (hasRestored.current && !isReady) {
      // Small delay to allow navigation to complete
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, isReady]);

  // Save current route on every navigation (only when ready)
  useEffect(() => {
    if (!isReady) return;

    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    sessionStorage.setItem(ROUTE_STORAGE_KEY, fullPath);
  }, [pathname, searchParams, isReady]);

  // Show loading while waiting for parent message or redirecting
  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
      </div>
    );
  }

  return children;
};
