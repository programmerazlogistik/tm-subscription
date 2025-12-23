"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to handle unsaved changes detection and navigation warnings
 *
 * @param {boolean} hasUnsavedChanges - Whether there are unsaved changes
 * @param {Function} onLeave - Optional callback when user confirms leaving
 * @returns {Object} - Object containing modal state and handlers
 */
export function useUnsavedChanges(hasUnsavedChanges = false, onLeave = null) {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const navigate = useRouter();
  const hasUnsavedRef = useRef(hasUnsavedChanges);

  // Update ref when hasUnsavedChanges prop changes
  useEffect(() => {
    hasUnsavedRef.current = hasUnsavedChanges;
  }, [hasUnsavedChanges]);

  // Handle browser navigation (back/forward/refresh)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedRef.current) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
        return ""; // Required for some browsers
      }
    };

    // Add event listener for browser navigation
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Function to attempt navigation with unsaved changes check
  const attemptNavigation = (navigationFn) => {
    if (hasUnsavedRef.current) {
      setPendingNavigation(() => navigationFn);
      setIsWarningModalOpen(true);
      return false; // Navigation blocked
    } else {
      navigationFn();
      return true; // Navigation allowed
    }
  };

  // Handle user confirming to leave (Batal = Cancel leaving)
  const handleConfirmLeave = () => {
    setIsWarningModalOpen(false);
    setPendingNavigation(null);
    // User chose to stay, do nothing
  };

  // Handle user canceling the warning (Ya = Yes, leave)
  const handleCancelWarning = () => {
    setIsWarningModalOpen(false);

    // Execute the pending navigation
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }

    // Call the onLeave callback if provided
    if (onLeave) {
      onLeave();
    }
  };

  // Wrapper function for Next.js router methods
  const createNavigationWrapper = (routerMethod) => {
    return (...args) => {
      return attemptNavigation(() => routerMethod(...args));
    };
  };

  // Enhanced router with unsaved changes protection
  const protectedRouter = {
    push: createNavigationWrapper(navigate.push.bind(navigate)),
    replace: createNavigationWrapper(navigate.replace.bind(navigate)),
    back: createNavigationWrapper(navigate.back.bind(navigate)),
    forward: createNavigationWrapper(navigate.forward.bind(navigate)),
    refresh: createNavigationWrapper(navigate.refresh.bind(navigate)),
  };

  return {
    isWarningModalOpen,
    showWarningModal: () => setIsWarningModalOpen(true),
    hideWarningModal: () => setIsWarningModalOpen(false),
    handleConfirmLeave, // User wants to stay
    handleCancelWarning, // User wants to leave
    attemptNavigation,
    protectedRouter,
    hasUnsavedChanges: hasUnsavedRef.current,
  };
}
