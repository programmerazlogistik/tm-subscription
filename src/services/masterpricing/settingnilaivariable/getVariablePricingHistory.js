import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing based on the provided response
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    route: "GORONTALO - LAMPUNG",
    truckType: "Colt Diesel Engkel",
    data: [
      {
        historyId: "3c0cea98-d543-48ea-8210-7658b9154a7a",
        settingVariableId: "3a12019b-58a6-432d-a70a-d3780d3a77e4",
        action: "UPDATE",
        waktuUpdate: "2025-09-23T02:10:31.150Z",
        aktivitas: "Update",
        user: "Backend BO GM",
        rumus: "6PL"
      },
      {
        historyId: "fa5c19f4-7635-4883-a0c3-ff791f0d1a38",
        settingVariableId: "3a12019b-58a6-432d-a70a-d3780d3a77e4",
        action: "CREATE",
        waktuUpdate: "2025-09-23T02:10:02.161Z",
        aktivitas: "Create",
        user: "Backend BO GM",
        rumus: "6PL"
      }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 2,
      limit: 10
    }
  },
  Type: "/v1/bo/pricing/setting/variable/routes/c9fc70fe-4eea-45ba-887d-dcee4e85ac5f/truck-type/550e8400-e29b-41d4-a716-446655440201/history?page=1&limit=10"
};

/**
 * Fetcher function to get variable pricing history for a specific route and truck type
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getVariablePricingHistory = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching variable pricing history
 * @param {string} routeId - The route ID to fetch data for
 * @param {string} truckTypeId - The truck type ID to fetch data for
 * @param {Object} params - Additional parameters like page and limit
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVariablePricingHistory = (
  routeId,
  truckTypeId,
  params = {},
  options = {}
) => {
  const { page = 1, limit = 10 } = params;
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  
  const queryString = queryParams.toString();
  const cacheKey =
    routeId && truckTypeId
      ? `/v1/bo/pricing/setting/variable/routes/${routeId}/truck-type/${truckTypeId}/history${queryString ? `?${queryString}` : ""}`
      : null;

  return useSWR(cacheKey, getVariablePricingHistory, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get variable pricing history with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getVariablePricingHistoryMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAPIResult;
};