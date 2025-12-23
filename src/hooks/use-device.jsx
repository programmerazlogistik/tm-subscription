"use client";

import { useEffect, useState } from "react";

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkDevice();

    // Listen for resize events
    window.addEventListener("resize", checkDevice);

    // Clean up
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile };
};

export default useDevice;
