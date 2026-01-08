"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

// Use mock data for development since server data is not available yet
const USE_MOCK = false;

// Mock API result for development/testing
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    id: "1e45854b-c0e6-4d92-b079-48ec60b46723",
    name: "Starter",
    description:
      "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas, masa aktif 30 hari.",
    muatkoin: 30,
    bonusMuatkoin: null,
    isUnlimited: false,
    isRecommended: false,
    price: 50000,
    originalPrice: null,
    period: 30,
    subUsersIncluded: 0,
    promo: null,
  },
  Type: "/v1/tm/buyer_subscription/purchase/packages/1e45854b-c0e6-4d92-b079-48ec60b46723",
};

// Fetcher function
export const getPackageDetail = async (packageId) => {
  let result;
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherTM.get(
      `/v1/tm/buyer_subscription/purchase/packages/${packageId}`
    );
  }
  return result.data;
};

// Hook for fetching subscription package detail
export const useGetPackageDetail = (packageId) => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken && packageId ? `get-package-detail/${packageId}` : null,
    () => getPackageDetail(packageId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
