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
      id: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
      status: true,
      alias: "GORONTALO - LAMPUNG",
      originProvinces: [
        {
          id: 75,
          name: "GORONTALO",
        },
      ],
      destinationProvinces: [
        {
          id: 18,
          name: "LAMPUNG",
        },
      ],
    },
    {
      id: "731df77a-a9df-43df-9564-fba370e1d38c",
      status: true,
      alias: "Sumatra - SumatrA",
      originProvinces: [
        {
          id: 11,
          name: "ACEH",
        },
        {
          id: 14,
          name: "RIAU",
        },
      ],
      destinationProvinces: [
        {
          id: 15,
          name: "JAMBI",
        },
        {
          id: 11,
          name: "ACEH",
        },
      ],
    },
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      status: false,
      alias: "JAKARTA - BANDUNG",
      originProvinces: [
        {
          id: 31,
          name: "DKI JAKARTA",
        },
      ],
      destinationProvinces: [
        {
          id: 32,
          name: "JAWA BARAT",
        },
      ],
    },
    {
      id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      status: true,
      alias: "SULAWESI - KALIMANTAN",
      originProvinces: [
        {
          id: 73,
          name: "SULAWESI SELATAN",
        },
        {
          id: 72,
          name: "SULAWESI TENGAH",
        },
      ],
      destinationProvinces: [
        {
          id: 62,
          name: "KALIMANTAN SELATAN",
        },
        {
          id: 63,
          name: "KALIMANTAN TIMUR",
        },
      ],
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
  Type: "/v1/bo/pricing/master/route",
};

/**
 * Fetcher function to get route list
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getRouteList = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for table usage
 */
export const transformRouteListToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((route) => ({
    id: route.id,
    isActive: route.status, // Map status to isActive for table compatibility
    alias: route.alias,
    originProvince:
      route.originProvinces?.map((province) => province.name).join(", ") || "",
    destinationProvince:
      route.destinationProvinces?.map((province) => province.name).join(", ") ||
      "",
    // Keep original data for other uses
    originProvincesData: route.originProvinces || [],
    destinationProvincesData: route.destinationProvinces || [],
  }));
};

/**
 * Transform API response pagination data
 * @param {Object} paginationData - Raw pagination data from API
 * @returns {Object} - Transformed pagination data
 */
export const transformPaginationData = (paginationData) => {
  if (!paginationData) return {};

  return {
    currentPage: paginationData.currentPage || 1,
    totalPages: paginationData.totalPages || 1,
    totalRecords: paginationData.totalRecords || 0,
    recordsPerPage: paginationData.recordsPerPage || 10,
    hasNext: paginationData.hasNext || false,
    hasPrev: paginationData.hasPrev || false,
  };
};

/**
 * Build query parameters for route list API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.status - Status filter
 * @returns {string} - Query string
 */
export const buildRouteListQuery = ({
  search = "",
  page = 1,
  limit = 10,
  status,
} = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (status !== undefined) {
    params.append("status", status.toString());
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return params.toString();
};

/**
 * SWR hook for fetching route list
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.status - Status filter
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetRouteList = (params = {}, options = {}) => {
  console.log("HELLO");
  const { search = "", page = 1, limit = 10, status } = params;

  const queryString = buildRouteListQuery({ search, page, limit, status });
  const cacheKey = `/v1/bo/pricing/master/route${queryString ? `?${queryString}` : ""}`;
  console.log("Cache Key:", cacheKey);

  return useSWR(cacheKey, getRouteList, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get route list with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.status - Status filter
 * @returns {Promise} - Mock data promise
 */
export const getRouteListMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, status } = params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredData = mockAPIResult.Data;

  // Apply status filter
  if (status !== undefined) {
    filteredData = filteredData.filter((route) => route.status === status);
  }

  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(
      (route) =>
        route.alias.toLowerCase().includes(search.toLowerCase()) ||
        route.originProvinces.some((province) =>
          province.name.toLowerCase().includes(search.toLowerCase())
        ) ||
        route.destinationProvinces.some((province) =>
          province.name.toLowerCase().includes(search.toLowerCase())
        )
    );
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    ...mockAPIResult,
    Data: paginatedData,
    Pagination: {
      ...mockAPIResult.Pagination,
      currentPage: page,
      totalRecords: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
      hasNext: endIndex < filteredData.length,
      hasPrev: page > 1,
    },
  };
};
