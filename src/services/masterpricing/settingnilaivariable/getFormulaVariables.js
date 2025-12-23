import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing based on the provided response
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    data: [
      {
        id: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
        name: "4XXL",
        isActive: true,
        createdAt: "2025-09-23T06:26:04.993Z",
        createdBy: "Backend BO GM",
      },
      {
        id: "ae6e1976-2bed-4fee-a055-f34a5b365d7f",
        name: "7PL2",
        isActive: true,
        createdAt: "2025-09-23T03:53:13.578Z",
        createdBy: "Backend BO GM",
      },
      {
        id: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
        name: "6PL",
        isActive: true,
        createdAt: "2025-09-20T02:27:44.730Z",
        createdBy: "Backend BO GM",
      },
      {
        id: "d9a845d1-8a88-453e-9485-ab813e43194c",
        name: "5PL",
        isActive: true,
        createdAt: "2025-09-20T02:27:23.333Z",
        createdBy: "Backend BO GM",
      },
      {
        id: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        name: "4PL",
        isActive: true,
        createdAt: "2025-09-18T16:17:49.926Z",
        createdBy: "Backend BO GM",
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 5,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  },
  Type: "/v1/bo/pricing/master/formula?status=true",
};

/**
 * Fetcher function to get formula variables with active status
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getFormulaVariables = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformFormulaVariablesToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((formula) => ({
    value: formula.id,
    label: formula.name,
  }));
};

/**
 * SWR hook for fetching formula variables with active status
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetFormulaVariables = (options = {}) => {
  const cacheKey = `/v1/bo/pricing/master/formula?status=true`;

  return useSWR(cacheKey, getFormulaVariables, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get formula variables with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getFormulaVariablesMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAPIResult;
};
