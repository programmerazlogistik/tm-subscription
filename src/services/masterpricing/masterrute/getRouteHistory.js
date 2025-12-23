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
      id: "9ef59243-e972-4822-89cf-52afd28392a4",
      routePricingId: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
      action: "CREATE",
      alias: "GORONTALO - LAMPUNG",
      originProvinces: [
        {
          id: 75,
          name: "GORONTALO"
        }
      ],
      destinationProvinces: [
        {
          id: 18,
          name: "LAMPUNG"
        }
      ],
      isActive: true,
      specialRoutes: [
        {
          id: "d638c323-7498-4cb5-8912-b4626038336f",
          isActive: true,
          createdAt: "2025-09-22T03:38:47.277Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-22T03:38:47.277Z",
          originCityId: 7502,
          routePricingId: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
          destinationCityId: 1803
        },
        {
          id: "c7c2fbc5-3638-42a5-965b-08244d7ad28f",
          isActive: true,
          createdAt: "2025-09-22T03:38:47.277Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-22T03:38:47.277Z",
          originCityId: 7504,
          routePricingId: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
          destinationCityId: 1872
        }
      ],
      createdAt: "2025-09-22T03:38:47.334Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "514d159d-1db8-4f71-86d4-01b087510030",
      routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
      action: "UPDATE",
      alias: "Sumatra - SumatrA",
      originProvinces: [
        {
          id: 11,
          name: "ACEH"
        },
        {
          id: 14,
          name: "RIAU"
        }
      ],
      destinationProvinces: [
        {
          id: 15,
          name: "JAMBI"
        },
        {
          id: 11,
          name: "ACEH"
        }
      ],
      isActive: true,
      specialRoutes: [
        {
          id: "23402548-006f-4e20-97c2-fe8871c9e456",
          isActive: true,
          createdAt: "2025-09-18T09:54:08.466Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-19T01:44:50.283Z",
          originCityId: 1103,
          routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
          destinationCityId: 1105
        },
        {
          id: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
          isActive: true,
          createdAt: "2025-09-19T01:44:50.283Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-19T01:44:50.283Z",
          originCityId: 1106,
          routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
          destinationCityId: 1110
        },
        {
          id: "5e458ce9-f728-4dd6-a95a-0f638e8e411f",
          isActive: true,
          createdAt: "2025-09-19T01:44:50.283Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-19T01:44:50.283Z",
          originCityId: 1110,
          routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
          destinationCityId: 1105
        }
      ],
      createdAt: "2025-09-19T01:44:50.382Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "cbf91d43-97da-4473-9594-481517f7e8fd",
      routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
      action: "UPDATE",
      alias: "Sumatra - SumatrA",
      originProvinces: [
        {
          id: 11,
          name: "ACEH"
        },
        {
          id: 14,
          name: "RIAU"
        }
      ],
      destinationProvinces: [
        {
          id: 15,
          name: "JAMBI"
        },
        {
          id: 11,
          name: "ACEH"
        }
      ],
      isActive: true,
      specialRoutes: [
        {
          id: "44a5eee6-c8b5-470b-9f2f-82333d30c7f1",
          isActive: true,
          createdAt: "2025-09-18T09:54:08.466Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-18T10:51:57.183Z",
          originCityId: 1103,
          routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
          destinationCityId: 1105
        }
      ],
      createdAt: "2025-09-18T10:51:57.280Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "7426f7a7-4656-4d1c-9eeb-e339fadef9dd",
      routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
      action: "UPDATE",
      alias: "Sumatra - SumatrA",
      originProvinces: [
        {
          id: 11,
          name: "ACEH"
        },
        {
          id: 14,
          name: "RIAU"
        }
      ],
      destinationProvinces: [
        {
          id: 15,
          name: "JAMBI"
        },
        {
          id: 11,
          name: "ACEH"
        }
      ],
      isActive: true,
      specialRoutes: null,
      createdAt: "2025-09-18T10:03:09.879Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "3ca9020a-7842-451b-b5d6-0c045cdf8a1c",
      routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
      action: "UPDATE",
      alias: "Sumatra - SumatrA",
      originProvinces: [
        {
          id: 11,
          name: "ACEH"
        },
        {
          id: 14,
          name: "RIAU"
        }
      ],
      destinationProvinces: [
        {
          id: 15,
          name: "JAMBI"
        },
        {
          id: 11,
          name: "ACEH"
        }
      ],
      isActive: true,
      specialRoutes: [
        {
          id: "c02f7326-ca72-4c2f-a0f5-f325dc74b4fd",
          isActive: true,
          createdAt: "2025-09-18T09:54:08.466Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          updatedAt: "2025-09-18T10:02:59.756Z",
          originCityId: 1103,
          routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
          destinationCityId: 1105
        }
      ],
      createdAt: "2025-09-18T10:02:59.852Z",
      createdBy: "Backend BO GM"
    }
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 2,
    totalRecords: 13,
    recordsPerPage: 10,
    hasNext: true,
    hasPrev: false
  },
  Type: "/v1/bo/pricing/master/route/history"
};

/**
 * Fetcher function to get route history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getRouteHistory = async (routeId, params = {}) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const queryString = buildRouteHistoryQuery(params);
  const url = `/v1/bo/pricing/master/route/${routeId}/history${queryString ? `?${queryString}` : ""}`;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformRouteHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((history) => {
    const createdDate = new Date(history.createdAt);
    
    return {
      id: history.id,
      routePricingId: history.routePricingId,
      action: history.action,
      alias: history.alias,
      originProvinces: history.originProvinces?.map(province => province.name).join(", ") || "",
      destinationProvinces: history.destinationProvinces?.map(province => province.name).join(", ") || "",
      isActive: history.isActive,
      specialRoutes: history.specialRoutes || [],
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
      // Keep original data for other uses
      originProvincesData: history.originProvinces || [],
      destinationProvincesData: history.destinationProvinces || [],
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
 * Build query parameters for route history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action (CREATE, UPDATE, DELETE)
 * @returns {string} - Query string
 */
export const buildRouteHistoryQuery = ({ 
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
 * SWR hook for fetching route history
 * @param {string} routeId - Route ID for the history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetRouteHistory = (routeId, params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, action = "" } = params;
  
  const queryString = buildRouteHistoryQuery({ search, page, limit, action });
  const cacheKey = `/v1/bo/pricing/master/route/${routeId}/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, () => getRouteHistory(routeId, params), {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get route history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @returns {Promise} - Mock data promise
 */
export const getRouteHistoryMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, action = "" } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(history => 
      history.alias.toLowerCase().includes(search.toLowerCase()) ||
      history.originProvinces.some(province => 
        province.name.toLowerCase().includes(search.toLowerCase())
      ) ||
      history.destinationProvinces.some(province => 
        province.name.toLowerCase().includes(search.toLowerCase())
      ) ||
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
