"use client";

import { createContext, useContext, useMemo } from "react";

const AuthenticationContext = createContext({});

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const value = useMemo(() => ({}), []);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
