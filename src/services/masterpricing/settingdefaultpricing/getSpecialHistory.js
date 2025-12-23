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
  Data: [
    {
      id: "4a31f4b0-61a5-4c38-b576-e0d283da7c05",
      createdAt: "2025-09-29T05:18:04.570Z",
      updatedAt: "2025-09-29T05:18:04.570Z",
      action: "CREATE",
      updatedBy: "Backend BO GM",
    },
    {
      id: "3105a898-d054-4315-ab6a-100be3e57ce0",
      createdAt: "2025-09-25T10:07:58.626Z",
      updatedAt: "2025-09-25T10:07:58.626Z",
      action: "UPDATE",
      updatedBy: "Backend BO GM",
    },
    {
      id: "23c07bf9-af04-4f73-9417-3343e588cccd",
      createdAt: "2025-09-25T10:07:36.540Z",
      updatedAt: "2025-09-25T10:07:36.540Z",
      action: "UPDATE",
      updatedBy: "Backend BO GM",
    },
    {
      id: "14e2ffd5-2707-498d-a55d-6e16a1b459ab",
      createdAt: "2025-09-25T10:07:11.950Z",
      updatedAt: "2025-09-25T10:07:11.950Z",
      action: "CREATE",
      updatedBy: "Backend BO GM",
    },
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 4,
    recordsPerPage: 10,
    hasNext: false,
    hasPrev: false,
  },
  Type: "/v1/bo/pricing/setting/default/special/history",
};

/**
 * Fetcher function to get special pricing history data
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getSpecialHistory = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching special pricing history data
 * @param {Object} options - SWR options
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of records per page
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetSpecialHistory = (page = 1, limit = 10, options = {}) => {
  const cacheKey = `/v1/bo/pricing/setting/default/special/history?page=${page}&limit=${limit}`;

  return useSWR(cacheKey, getSpecialHistory, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get special pricing history data with mock data for development
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of records per page
 * @returns {Promise} - Mock data promise
 */
export const getSpecialHistoryMock = async (page = 1, limit = 10) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For pagination simulation
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = mockAPIResult.Data.slice(startIndex, endIndex);

  return {
    data: {
      ...mockAPIResult,
      Data: paginatedData,
      Pagination: {
        ...mockAPIResult.Pagination,
        currentPage: page,
        recordsPerPage: limit,
        totalRecords: mockAPIResult.Data.length,
        totalPages: Math.ceil(mockAPIResult.Data.length / limit),
      },
    },
  };
};

/**
 * Fetcher function to get special pricing history data by route ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getSpecialHistoryByRoute = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching special pricing history data by route ID
 * @param {string} routeId - The route ID to fetch history for
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of records per page
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetSpecialHistoryByRoute = (routeId, page = 1, limit = 10, options = {}) => {
  const cacheKey = routeId ? `/v1/bo/pricing/setting/default/special/history/by-route/${routeId}?page=${page}&limit=${limit}` : null;

  return useSWR(cacheKey, getSpecialHistoryByRoute, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get special pricing history data by route ID with mock data for development
 * @param {string} routeId - The route ID to fetch history for
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of records per page
 * @returns {Promise} - Mock data promise
 */
export const getSpecialHistoryByRouteMock = async (routeId, page = 1, limit = 10) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data for route-specific history
  const mockRouteHistoryData = {
    Message: {
      Code: 200,
      Text: "OK"
    },
    Data: [
      {
        "id": "4a31f4b0-61a5-4c38-b576-e0d283da7c05",
        "createdAt": "2025-09-29T05:18:04.570Z",
        "updatedAt": "2025-09-29T05:18:04.570Z",
        "action": "CREATE",
        "updatedBy": "Backend BO GM"
      }
    ],
    Pagination: {
      "currentPage": 1,
      "totalPages": 1,
      "totalRecords": 1,
      "recordsPerPage": 10,
      "hasNext": false,
      "hasPrev": false
    },
    "Type": `/v1/bo/pricing/setting/default/special/history/by-route/${routeId}`
  };

  // For pagination simulation
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = mockRouteHistoryData.Data.slice(startIndex, endIndex);

  return {
    data: {
      ...mockRouteHistoryData,
      Data: paginatedData,
      Pagination: {
        ...mockRouteHistoryData.Pagination,
        currentPage: page,
        recordsPerPage: limit,
        totalRecords: mockRouteHistoryData.Data.length,
        totalPages: Math.ceil(mockRouteHistoryData.Data.length / limit),
      },
    },
  };
};
