"use client";

import { fetcherGeneral } from "@/lib/axios";

import { useSWRHook } from "../use-swr";

const USE_MOCK = false;

const MOCK_DATA = {
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

/**
 * Hook to fetch the user's muatkoin balance
 * @returns {Object} SWR response with balance data
 */
export function useGetBalance() {
  const { data, error, isLoading, isValidating, mutate } = useSWRHook(
    USE_MOCK ? null : "/v1/tm/buyer_subscription/balance",
    fetcherGeneral,
    {},
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: USE_MOCK ? MOCK_DATA : data,
    isLoading: USE_MOCK ? false : isLoading,
    isValidating: USE_MOCK ? false : isValidating,
    error: USE_MOCK ? null : error,
    mutate,
  };
}
