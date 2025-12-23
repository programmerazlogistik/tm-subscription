import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    routeId: "731df77a-a9df-43df-9564-fba370e1d38c",
    routeAlias: "Sumatra - SumatrA",
    totalSpecialRoutes: 3,
    specialRoutes: [
      {
        routePricingSpecialId: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
        routePricingSpecialName: "KAB. ACEH BESAR - KAB. ACEH SINGKIL",
        originCityId: 1106,
        typePricingName: null,
        destinationCityId: 1110,
        isActive: true,
        createdAt: "2025-09-19T01:44:50.283Z",
      },
      {
        routePricingSpecialId: "5e458ce9-f728-4dd6-a95a-0f638e8e411f",
        routePricingSpecialName: "KAB. ACEH SINGKIL - KAB. ACEH BARAT",
        originCityId: 1110,
        destinationCityId: 1105,
        isActive: true,
        createdAt: "2025-09-19T01:44:50.283Z",
      },
      {
        routePricingSpecialId: "23402548-006f-4e20-97c2-fe8871c9e456",
        routePricingSpecialName: "KAB. ACEH TIMUR - KAB. ACEH BARAT",
        originCityId: 1103,
        destinationCityId: 1105,
        isActive: true,
        createdAt: "2025-09-18T09:54:08.466Z",
      },
    ],
  },
  Type: "/v1/bo/pricing/setting/default/special-routes",
};

/**
 * Fetcher function to get special routes data by route ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getSpecialRoutes = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching special routes data
 * @param {string} routeId - The route ID to fetch special routes for
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetSpecialRoutes = (routeId, options = {}) => {
  const cacheKey = routeId
    ? `/v1/bo/pricing/setting/default/special/${routeId}`
    : null;

  return useSWR(cacheKey, getSpecialRoutes, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get special routes data with mock data for development
 * @param {string} routeId - The route ID to fetch special routes for
 * @returns {Promise} - Mock data promise
 */
export const getSpecialRoutesMock = async (routeId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If routeId is provided, filter mock data accordingly
  if (routeId) {
    return mockAPIResult;
  }

  return mockAPIResult;
};
