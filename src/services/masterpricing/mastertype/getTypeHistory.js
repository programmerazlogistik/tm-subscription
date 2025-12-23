import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: [
    {
      id: "b8a1b9bd-06b6-4e85-a87b-6cc888473721",
      typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
      action: "UPDATE",
      name: "Low edit",
      isActive: true,
      createdAt: "2025-09-18T14:47:34.795Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "50902617-85af-4d58-ba28-76d4aeb9ace5",
      typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
      action: "UPDATE",
      name: "Low",
      isActive: false,
      createdAt: "2025-09-18T14:42:10.791Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "80ea7606-6975-4d6c-8cd6-41c6c39775e0",
      typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
      action: "CREATE",
      name: "High",
      isActive: true,
      createdAt: "2025-09-18T14:25:59.599Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "b8211440-10c6-4193-a64c-5b285981bf87",
      typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
      action: "CREATE",
      name: "Medium",
      isActive: true,
      createdAt: "2025-09-18T14:21:47.904Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "362c8919-f495-4368-b80d-96b261a4f573",
      typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
      action: "CREATE",
      name: "Low",
      isActive: true,
      createdAt: "2025-09-18T14:21:00.730Z",
      createdBy: "Backend BO GM"
    }
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 5,
    recordsPerPage: 10,
    hasNext: false,
    hasPrev: false
  },
  Type: "/v1/bo/pricing/master/type/history"
};

/**
 * Fetcher function to get type history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getTypeHistory = async (typeId, params = {}) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const queryString = buildTypeHistoryQuery(params);
  const url = `/v1/bo/pricing/master/type/${typeId}/history${queryString ? `?${queryString}` : ""}`;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformTypeHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((history) => {
    const createdDate = new Date(history.createdAt);
    
    return {
      id: history.id,
      typePricingId: history.typePricingId,
      action: history.action,
      name: history.name,
      isActive: history.isActive,
      createdAt: history.createdAt,
      createdBy: history.createdBy,
      // Formatted display values
      createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      status: history.isActive ? "Aktif" : "Tidak Aktif",
      statusColor: history.isActive ? "text-green-600" : "text-red-600",
    };
  });
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
 * Build query parameters for type history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action (CREATE, UPDATE, DELETE)
 * @returns {string} - Query string
 */
export const buildTypeHistoryQuery = ({ 
  search = "", 
  page = 1, 
  limit = 10, 
  action = "" 
} = {}) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append("search", search);
  }
  
  if (action) {
    params.append("action", action);
  }
  
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  
  return params.toString();
};

/**
 * SWR hook for fetching type history
 * @param {string} typeId - Type ID for the history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetTypeHistory = (typeId, params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, action = "" } = params;
  
  const queryString = buildTypeHistoryQuery({ search, page, limit, action });
  const cacheKey = `/v1/bo/pricing/master/type/${typeId}/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, () => getTypeHistory(typeId, params), {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get type history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @returns {Promise} - Mock data promise
 */
export const getTypeHistoryMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, action = "" } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(history => 
      history.name.toLowerCase().includes(search.toLowerCase()) ||
      history.action.toLowerCase().includes(search.toLowerCase()) ||
      history.createdBy.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply action filter
  if (action) {
    filteredData = filteredData.filter(history => 
      history.action.toLowerCase() === action.toLowerCase()
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
    }
  };
};

/**
 * Get action display text
 * @param {string} action - Action code
 * @returns {string} - Display text
 */
export const getActionDisplayText = (action) => {
  const actionMap = {
    CREATE: "Dibuat",
    UPDATE: "Diperbarui", 
    DELETE: "Dihapus",
    ACTIVATE: "Diaktifkan",
    DEACTIVATE: "Dinonaktifkan"
  };
  
  return actionMap[action] || action;
};

/**
 * Get action color class
 * @param {string} action - Action code
 * @returns {string} - CSS class
 */
export const getActionColorClass = (action) => {
  const colorMap = {
    CREATE: "text-green-600 bg-green-100",
    UPDATE: "text-blue-600 bg-blue-100",
    DELETE: "text-red-600 bg-red-100",
    ACTIVATE: "text-green-600 bg-green-100",
    DEACTIVATE: "text-orange-600 bg-orange-100"
  };
  
  return colorMap[action] || "text-gray-600 bg-gray-100";
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
