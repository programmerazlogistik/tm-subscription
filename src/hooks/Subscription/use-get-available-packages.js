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
    packages: [
      {
        id: "1e45854b-c0e6-4d92-b079-48ec60b46723",
        name: "Starter",
        description:
          "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
        muatkoin: 30,
        isUnlimited: false,
        price: 50000,
        originalPrice: null,
        currency: "IDR",
        period: 30,
        periodLabel: "Masa Aktif 30 Hari",
        isPopular: false,
        isRecommended: false,
        subUsersIncluded: 0,
        bonusMuatkoin: null,
        promo: null,
        purchaseLimit: null,
        purchaseLimitEnabled: false,
        userEligible: true,
        canPurchase: true,
      },
      {
        id: "405edb1b-b453-4be8-bcec-816efcd1e95f",
        name: "Pro",
        description:
          "Paket hemat dengan bonus kredit dan akses ke semua fitur dengan kredit melimpah.",
        muatkoin: 350,
        isUnlimited: false,
        price: 250000,
        originalPrice: 300000,
        currency: "IDR",
        period: 30,
        periodLabel: "Masa Aktif 30 Hari",
        isPopular: true,
        isRecommended: true,
        subUsersIncluded: 1,
        bonusMuatkoin: 20,
        promo: null,
        purchaseLimit: 1,
        purchaseLimitEnabled: true,
        userEligible: true,
        canPurchase: true,
      },
      {
        id: "05a8aa94-6167-4ede-b029-185ca48c9d2e",
        name: "Premium",
        description:
          "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
        muatkoin: 0,
        isUnlimited: true,
        price: 2000000,
        originalPrice: null,
        currency: "IDR",
        period: 30,
        periodLabel: "Masa Aktif 30 Hari",
        isPopular: false,
        isRecommended: false,
        subUsersIncluded: 3,
        bonusMuatkoin: null,
        promo: null,
        purchaseLimit: null,
        purchaseLimitEnabled: false,
        userEligible: true,
        canPurchase: true,
      },
    ],
  },
  Type: "/v1/tm/buyer_subscription/packages",
};

// Fetcher function
export const getAvailablePackages = async () => {
  let result;
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherBaseURL.get("/v1/tm/buyer_subscription/packages");
  }
  return result.data;
};

// Hook for fetching available subscription packages
export const useGetAvailablePackages = () => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken ? "get-available-packages" : null,
    () => getAvailablePackages(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
