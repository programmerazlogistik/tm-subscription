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
    id: "faa1f194-814d-4c43-a963-31d93b979f65",
    name: "Paket Premium",
    description: "Premium",
    muatkoin: 123,
    bonusMuatkoin: 0,
    isUnlimited: false,
    isRecommended: true,
    price: 103,
    originalPrice: 123,
    period: 30,
    subUsersIncluded: 123,
    promo: {
      id: "3ee1bd24-8ef3-4f91-8065-6f62f7aca166",
      name: "Promo Paket Premium",
      discount: 20,
      bonusMuatkoin: 0,
    },
  },
  Type: "/v1/tm/buyer_subscription/purchase/packages/faa1f194-814d-4c43-a963-31d93b979f65",
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
