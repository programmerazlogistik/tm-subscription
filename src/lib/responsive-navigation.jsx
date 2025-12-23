import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

// MODIFIED: Imported useEffect

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import useDevice from "@/hooks/use-device";
import { useShallowCompareEffect } from "@/hooks/use-shallow-effect";

import { zustandDevtools } from "./utils";

/**
 * @typedef {Object} StackEntry
 * @property {string} path - The route path (e.g., "/about").
 * @property {React.ReactNode} component - The React element to render.
 * @property {Record<string, any>} [params] - Optional parameters passed to the route.
 */

/**
 * @typedef {Object} NavigationActions
 * @property {(path: string, params?: Record<string, any>) => void} push - Push a new screen to the navigation stack.
 * @property {() => void} pop - Remove the top screen from the navigation stack.
 * @property {(path: string) => void} popTo - Pop screens until reaching the specified path.
 * @property {() => void} popToTop - Pop all screens except the first one.
 * @property {(path: string, params?: Record<string, any>) => void} replace - Replace the current screen with a new one.
 */

/**
 * @typedef {Object} NavigationState
 * @property {StackEntry[]} stack - Stack of route entries representing the navigation history.
 * @property {NavigationActions} actions - Actions for navigation operations.
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<NavigationState>>} */
const useNavigationStore = create(
  persist(
    zustandDevtools(
      (set) => ({
        stack: [{ path: "/", params: {} }],
        isHydrated: false,
        isReady: false,
        isDoingRealNavigation: true,
        actions: {
          push: (path, params = {}) =>
            set((state) => ({
              stack: [...state.stack, { path, params }],
            })),
          pop: () =>
            set((state) => {
              if (state.stack.length > 1) {
                return { stack: state.stack.slice(0, -1) };
              }
              return state;
            }),
          popTo: (path) =>
            set((state) => {
              const targetIndex = state.stack.findIndex(
                (entry) => entry.path === path
              );
              if (targetIndex === -1) return state;
              return { stack: state.stack.slice(0, targetIndex + 1) };
            }),
          popToTop: () =>
            set((state) => ({
              stack: state.stack.slice(0, 1),
            })),
          replace: (path, params = {}) =>
            set(() => {
              return { stack: [{ path, params }] };
            }),

          setHasHydrated: () => set({ isHydrated: true }),
          setHasReady: () => set({ isReady: true }),
          setIsDoingRealNavigation: (value) =>
            set({ isDoingRealNavigation: value }),
        },
      }),
      { name: "responsive-navigation" }
    ),
    {
      name: "responsive-navigation",
      partialize: (state) => ({ stack: state.stack }),
      onRehydrateStorage: () => (state, error) => {
        setTimeout(() => {
          state?.actions?.setHasHydrated?.();
        }, 1000);
      },
    }
  )
);

const isValidScreenPath = (path) =>
  typeof path === "string" && path.startsWith("/");

export const ResponsiveProvider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const screenSearchParam = searchParams.get("screen");
  const stack = useNavigationStore(useShallow((state) => state.stack));
  const {
    replace: replaceNavigation,
    setHasReady: setNavigationHasReady,
    popTo,
    setIsDoingRealNavigation,
  } = useNavigationStore((state) => state.actions);
  const isNavigationHydrated = useNavigationStore((state) => state.isHydrated);
  const hasCheckedInitial = useRef(false);
  const { isMobile } = useDevice();

  // Synchronize isDoingRealNavigation with stack length
  useEffect(() => {
    if (!isNavigationHydrated) return;

    const shouldBeRealNavigation = stack.length === 1;
    const currentState = useNavigationStore.getState();

    if (currentState.isDoingRealNavigation !== shouldBeRealNavigation) {
      setIsDoingRealNavigation(shouldBeRealNavigation);
    }
  }, [stack.length, isNavigationHydrated, setIsDoingRealNavigation]);

  useShallowCompareEffect(() => {
    if (hasCheckedInitial.current || !isMobile || !isNavigationHydrated) return;
    hasCheckedInitial.current = true;
    const currentStack = stack[stack.length - 1];
    if (!screenSearchParam) {
      if (currentStack?.path !== "/") {
        replaceNavigation("/");
      }
    } else if (decodeURIComponent(screenSearchParam) !== currentStack?.path) {
      const decoded = decodeURIComponent(screenSearchParam);
      if (isValidScreenPath(decoded)) {
        const foundEntry = stack.find((entry) => entry.path === decoded);
        if (foundEntry) {
          replaceNavigation(decoded, foundEntry.params);
        } else {
          replaceNavigation("/");
        }
      } else {
        replaceNavigation("/");
      }
    }
    setNavigationHasReady();
  }, [stack, screenSearchParam, isMobile, isNavigationHydrated]);

  // On stack change: update the search param if needed
  useShallowCompareEffect(() => {
    if (!isMobile || !isNavigationHydrated) return;
    const currentStack = stack[stack.length - 1];
    if (!currentStack) return; // Guard against empty stack

    const stackString = encodeURIComponent(currentStack.path);
    if (screenSearchParam !== stackString) {
      const params = new URLSearchParams(window.location.search);
      params.set("screen", stackString);

      // MODIFICATION 1: Use `push` to create browser history entries.
      if (searchParams.size > 0) {
        router.replace(`${window.location.pathname}?${params.toString()}`, {
          scroll: false,
        });
      } else {
        router.replace(`${window.location.pathname}?${params.toString()}`, {
          scroll: false,
        });
      }
    }
  }, [stack, searchParams, screenSearchParam, isMobile, isNavigationHydrated]);

  // Listen for browser back/forward button clicks
  useEffect(() => {
    if (!isMobile) return; // Only handle on mobile

    const handlePopState = (event) => {
      const state = useNavigationStore.getState();

      // If we're doing a real navigation (from router.back()), don't interfere
      if (state.isDoingRealNavigation) {
        state.actions.setIsDoingRealNavigation(false);
        return;
      }

      const newScreen =
        new URLSearchParams(window.location.search).get("screen") ?? "/";
      const decodedScreen = decodeURIComponent(newScreen);

      const currentStack = state.stack;
      const topOfStackPath = currentStack[currentStack.length - 1]?.path;

      // Only sync if the URL state is different from the stack state
      if (decodedScreen !== topOfStackPath) {
        // Check if the target screen exists in our stack
        const targetIndex = currentStack.findIndex(
          (entry) => entry.path === decodedScreen
        );

        if (targetIndex !== -1) {
          // If target exists in stack, pop to it
          popTo(decodedScreen);
        } else {
          // If target doesn't exist in stack, it means we went back beyond our virtual navigation
          // Reset to the base route
          const { replace: replaceNavigation } =
            useNavigationStore.getState().actions;
          replaceNavigation(decodedScreen);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [popTo, isMobile]);

  return children;
};

export const useResponsiveNavigation = () => {
  const router = useRouter();
  const {
    push,
    pop: popFromStack,
    popTo,
    popToTop,
    replace,
  } = useNavigationStore((state) => state.actions);
  const stack = useNavigationStore(useShallow((state) => state.stack));

  const pop = () => {
    // If stack has more than one entry, pop from virtual stack
    if (stack.length > 1) {
      console.log("Popping from virtual stack");
      popFromStack();
    } else {
      // If stack only has one entry, use real Next.js router back
      console.log("router.back()");
      router.back();
    }
  };

  return { push, pop, popTo, popToTop, replace };
};

export const useResponsiveRouteParams = () => {
  const stack = useNavigationStore(useShallow((state) => state.stack));
  return stack[stack.length - 1]?.params || {};
};

export const ResponsiveRoute = ({ path, component }) => {
  const stack = useNavigationStore(
    useShallow((state) => state.stack.slice(-1))
  );
  const isNavigationReady = useNavigationStore((state) => state.isReady);
  const current = stack[stack.length - 1];

  if (path !== current?.path || !isNavigationReady) return null;

  return component;
};
