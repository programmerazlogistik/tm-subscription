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
    route: "rute tes",
    data: [
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
        truckTypeName: "Colt Diesel Engkel",
        formula: "6PL",
        validFrom: "2024-12-02",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
        truckTypeName: "Colt Diesel Double",
        formula: "",
        validFrom: "",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 2,
      limit: 10,
    },
  },
  Type: "/v1/bo/pricing/setting/variable/routes/c9fc70fe-4eea-45ba-887d-dcee4e85ac5f?search=",
};

/**
 * Fetcher function to get variable pricing data for a specific route
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getVariablePricing = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching variable pricing data for a specific route
 * @param {string} routeId - The route ID to fetch data for
 * @param {Object} params - Additional parameters like search query
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVariablePricing = (routeId, params = {}, options = {}) => {
  const {
    search = "",
    sort = null,
    order = null,
    page = 1,
    limit = 10,
  } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (sort) queryParams.append("sort", sort);
  if (order) queryParams.append("order", order);
  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);

  const queryString = queryParams.toString();
  const cacheKey = routeId
    ? `/v1/bo/pricing/setting/variable/routes/${routeId}${queryString ? `?${queryString}` : ""}`
    : null;

  return useSWR(cacheKey, getVariablePricing, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get variable pricing data with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getVariablePricingMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAPIResult;
};
