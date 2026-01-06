"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherBaseURL } from "@/lib/axios";

// Use mock data for development since server data is not available yet
const USE_MOCK = false;

// Mock API result for development/testing
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    currentBalance: 20,
    totalBalance: 80,
    currency: "muatkoin",
  },
  Type: "/v1/tm/buyer_subscription/balance",
};

// Fetcher function
export const getBalance = async () => {
  let result;
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherBaseURL.get("/v1/tm/buyer_subscription/balance");
  }
  return result.data;
};

// Hook for fetching user's muatkoin balance
export const useGetBalance = () => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(accessToken ? "get-balance" : null, () => getBalance(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
