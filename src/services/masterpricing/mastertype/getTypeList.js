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
      id: "f1c6182d-15b3-47c4-828d-ce91ad00344c",
      name: "QC-Testing - Pricing Type",
      isActive: false,
    },
    {
      id: "eafdb4d1-f364-4b4a-86e6-31a5bb4dae60",
      name: "QC-Dua",
      isActive: false,
    },
    {
      id: "88545e1c-2cbb-4450-b870-bbddc66d5a39",
      name: "QC-1",
      isActive: false,
    },
    {
      id: "a286ef64-73f6-484b-87f4-c7f8614e424d",
      name: "coba2",
      isActive: false,
    },
    {
      id: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
      name: "Harga",
      isActive: false,
    },
    {
      id: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
      name: "High",
      isActive: true,
    },
    {
      id: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
      name: "Medium",
      isActive: true,
    },
    {
      id: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
      name: "Low edit",
      isActive: true,
    },
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 8,
    recordsPerPage: 10,
    hasNext: false,
    hasPrev: false,
  },
  Type: "/v1/bo/pricing/master/type",
};

/**
 * Fetcher function to get type list
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getTypeList = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformTypeListToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((type) => ({
    id: type.id,
    name: type.name,
    typeName: type.name, // Add typeName field for table compatibility
    isActive: type.isActive,
    // Formatted display values
    status: type.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: type.isActive ? "text-green-600" : "text-red-600",
    statusBadge: type.isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200",
  }));
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformTypeListToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData
    .filter((type) => type.isActive) // Only active types for dropdown
    .map((type) => ({
      value: type.id,
      label: type.name,
    }));
};

/**
 * Transform API response data to select format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for select usage
 */
export const transformTypeListToSelectData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((type) => ({
    value: type.id,
    label: type.name,
    isActive: type.isActive,
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
 * Build query parameters for type list API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @returns {string} - Query string
 */
export const buildTypeListQuery = ({
  search = "",
  page = 1,
  limit = 10,
  isActive = null,
} = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (isActive !== null) {
    params.append("isActive", isActive.toString());
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return params.toString();
};

/**
 * SWR hook for fetching type list
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetTypeList = (params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, isActive = null } = params;

  const queryString = buildTypeListQuery({ search, page, limit, isActive });
  const cacheKey = `/v1/bo/pricing/master/type${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getTypeList, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get type list with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @returns {Promise} - Mock data promise
 */
export const getTypeListMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, isActive = null } = params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredData = mockAPIResult.Data;

  // Apply search filter
  if (search) {
    filteredData = filteredData.filter((type) =>
      type.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply active status filter
  if (isActive !== null) {
    filteredData = filteredData.filter((type) => type.isActive === isActive);
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

/**
 * Get status display text
 * @param {boolean} isActive - Active status
 * @returns {string} - Display text
 */
export const getStatusDisplayText = (isActive) => {
  return isActive ? "Aktif" : "Tidak Aktif";
};

/**
 * Get status color class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class
 */
export const getStatusColorClass = (isActive) => {
  return isActive ? "text-green-600" : "text-red-600";
};

/**
 * Get status badge class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class for badge
 */
export const getStatusBadgeClass = (isActive) => {
  return isActive
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";
};

/**
 * Get type by ID from list
 * @param {Array} typeList - Array of types
 * @param {string} typeId - Type ID to find
 * @returns {Object|null} - Found type or null
 */
export const getTypeById = (typeList, typeId) => {
  if (!typeList || !Array.isArray(typeList) || !typeId) return null;

  return typeList.find((type) => type.id === typeId) || null;
};

/**
 * Get active types only
 * @param {Array} typeList - Array of types
 * @returns {Array} - Active types only
 */
export const getActiveTypes = (typeList) => {
  if (!typeList || !Array.isArray(typeList)) return [];

  return typeList.filter((type) => type.isActive);
};

/**
 * Get inactive types only
 * @param {Array} typeList - Array of types
 * @returns {Array} - Inactive types only
 */
export const getInactiveTypes = (typeList) => {
  if (!typeList || !Array.isArray(typeList)) return [];

  return typeList.filter((type) => !type.isActive);
};

/**
 * Search types by name
 * @param {Array} typeList - Array of types
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered types
 */
export const searchTypesByName = (typeList, searchTerm) => {
  if (!typeList || !Array.isArray(typeList) || !searchTerm) return typeList;

  return typeList.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort types by name
 * @param {Array} typeList - Array of types
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted types
 */
export const sortTypesByName = (typeList, order = "asc") => {
  if (!typeList || !Array.isArray(typeList)) return [];

  return [...typeList].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return order === "desc" ? -comparison : comparison;
  });
};

/**
 * Sort types by status
 * @param {Array} typeList - Array of types
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted types
 */
export const sortTypesByStatus = (typeList, order = "asc") => {
  if (!typeList || !Array.isArray(typeList)) return [];

  return [...typeList].sort((a, b) => {
    const comparison = a.isActive - b.isActive;
    return order === "desc" ? -comparison : comparison;
  });
};
