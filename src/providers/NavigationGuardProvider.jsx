"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const NavigationGuardContext = createContext();

export const useNavigationGuard = () => {
  const context = useContext(NavigationGuardContext);
  if (!context) {
    throw new Error("useNavigationGuard must be used within NavigationGuardProvider");
  }
  return context;
};

export const NavigationGuardProvider = ({ children }) => {
  const router = useRouter();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    const handlePopState = (e) => {
      if (hasUnsavedChanges) {
        // Prevent navigation and show modal
        window.history.pushState(null, "", window.location.href);
        setShowWarningModal(true);
        setPendingNavigation(() => () => window.history.back());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasUnsavedChanges]);

  const checkNavigation = (navigationCallback) => {
    if (hasUnsavedChanges) {
      setShowWarningModal(true);
      setPendingNavigation(() => navigationCallback);
      return false; // Block navigation
    }
    navigationCallback();
    return true; // Allow navigation
  };

  const confirmNavigation = () => {
    setShowWarningModal(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
    setHasUnsavedChanges(false); // Reset after navigation is confirmed
  };

  const cancelNavigation = () => {
    setShowWarningModal(false);
    setPendingNavigation(null);
  };

  return (
    <NavigationGuardContext.Provider
      value={{
        hasUnsavedChanges,
        setHasUnsavedChanges,
        checkNavigation,
        showWarningModal,
        confirmNavigation,
        cancelNavigation,
      }}
    >
      {children}
    </NavigationGuardContext.Provider>
  );
};