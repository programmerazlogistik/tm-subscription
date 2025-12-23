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
  data: {
    Data: [
    {
      id: "6c3c03ff-1fcb-4047-860e-b2633e2341c0",
      formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
      action: "CREATE",
      name: "4XXL",
      isActive: true,
      variables: [
        {
          id: "3c80eee7-e4a8-4bd3-918b-6b3c71d0ed17",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "jarak",
          isFromShipper: true
        },
        {
          id: "d7e47069-67aa-4d3c-9d87-d07ebde9820d",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "tonase",
          isFromShipper: true
        },
        {
          id: "fd259411-9a0b-451d-9302-24f717bddf61",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "a",
          isFromShipper: false
        },
        {
          id: "59985984-d2b4-4fcb-8a73-b0f1577644ea",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "b",
          isFromShipper: false
        },
        {
          id: "6c647c9a-0f83-4570-90a3-96129713b987",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "c",
          isFromShipper: false
        }
      ],
      createdAt: "2025-09-23T06:26:05.011Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "a330a0c8-371b-4db2-a52e-5f5b6df53db1",
      formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
      action: "UPDATE",
      name: "4XXL",
      isActive: false,
      variables: [
        {
          id: "3c80eee7-e4a8-4bd3-918b-6b3c71d0ed17",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "jarak",
          isFromShipper: true
        },
        {
          id: "d7e47069-67aa-4d3c-9d87-d07ebde9820d",
          isActive: true,
          createdAt: "2025-09-23T06:26:04.997Z",
          createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
          deletedAt: null,
          formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
          updatedAt: "2025-09-23T06:26:04.997Z",
          variableName: "tonase",
          isFromShipper: true
        }
      ],
      createdAt: "2025-09-22T10:30:15.123Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "df9c6870-92db-4ce6-9b97-559626005b92",
      formulaId: "3c33eeef-93ac-42d8-9c24-9e07dc48e61b",
      action: "UPDATE",
      name: "4XXL",
      isActive: true,
      variables: [],
      createdAt: "2025-09-21T15:45:30.456Z",
      createdBy: "Backend BO GM"
    }
    ],
    Pagination: {
      page: 1,
      limit: 10,
      total: 3,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    }
  },
  Type: "/v1/bo/pricing/master/formula/3c33eeef-93ac-42d8-9c24-9e07dc48e61b/history"
};

/**
 * Fetcher function to get formula history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getFormulaHistory = async (formulaId, params = {}) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const queryString = buildFormulaHistoryQuery(params);
  const url = `/v1/bo/pricing/master/formula/${formulaId}/history${queryString ? `?${queryString}` : ""}`;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformFormulaHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((history) => {
    const createdDate = new Date(history.createdAt);
    
    return {
      id: history.id,
      formulaId: history.formulaId,
      action: history.action,
      name: history.name,
      isActive: history.isActive,
      variables: history.variables || [],
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
      statusBadge: history.isActive 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-red-100 text-red-800 border-red-200",
      variablesCount: history.variables ? history.variables.length : 0,
      variablesList: history.variables ? history.variables.map(v => v.variableName).join(", ") : "",
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
    currentPage: paginationData.page || 1,
    totalPages: paginationData.totalPages || 1,
    totalRecords: paginationData.total || 0,
    recordsPerPage: paginationData.limit || 10,
    hasNext: paginationData.hasNext || false,
    hasPrev: paginationData.hasPrev || false,
  };
};

/**
 * Build query parameters for formula history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action (CREATE, UPDATE, DELETE)
 * @returns {string} - Query string
 */
export const buildFormulaHistoryQuery = ({ 
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
 * SWR hook for fetching formula history
 * @param {string} formulaId - Formula ID for the history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetFormulaHistory = (formulaId, params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, action = "" } = params;
  
  const queryString = buildFormulaHistoryQuery({ search, page, limit, action });
  const cacheKey = `/v1/bo/pricing/master/formula/${formulaId}/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, () => getFormulaHistory(formulaId, params), {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get formula history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.formulaId - Filter by formula ID
 * @returns {Promise} - Mock data promise
 */
export const getFormulaHistoryMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, action = "", formulaId = "" } = params;
  
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
  
  // Apply formula ID filter
  if (formulaId) {
    filteredData = filteredData.filter(history => 
      history.formulaId === formulaId
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
      page: page,
      total: filteredData.length,
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

/**
 * Get variables display text
 * @param {Array} variables - Array of variables
 * @param {number} maxLength - Maximum length to display
 * @returns {string} - Display text
 */
export const getVariablesDisplayText = (variables, maxLength = 50) => {
  if (!variables || !Array.isArray(variables) || variables.length === 0) {
    return "Tidak ada variabel";
  }
  
  const variableNames = variables.map(v => v.variableName).join(", ");
  
  if (variableNames.length <= maxLength) {
    return variableNames;
  }
  
  return `${variableNames.substring(0, maxLength)}...`;
};

/**
 * Get variables count text
 * @param {Array} variables - Array of variables
 * @returns {string} - Count text
 */
export const getVariablesCountText = (variables) => {
  if (!variables || !Array.isArray(variables)) {
    return "0 variabel";
  }
  
  const count = variables.length;
  return count === 1 ? "1 variabel" : `${count} variabel`;
};

/**
 * Get source display text
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - Display text
 */
export const getSourceDisplayText = (isFromShipper) => {
  return isFromShipper ? "Shipper" : "Sistem";
};

/**
 * Get source color class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class
 */
export const getSourceColorClass = (isFromShipper) => {
  return isFromShipper ? "text-blue-600" : "text-green-600";
};

/**
 * Get source badge class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class for badge
 */
export const getSourceBadgeClass = (isFromShipper) => {
  return isFromShipper 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};

/**
 * Filter history by action
 * @param {Array} historyData - Array of history data
 * @param {string} action - Action to filter by
 * @returns {Array} - Filtered history data
 */
export const filterHistoryByAction = (historyData, action) => {
  if (!historyData || !Array.isArray(historyData) || !action) return historyData;
  
  return historyData.filter(history => 
    history.action.toLowerCase() === action.toLowerCase()
  );
};

/**
 * Filter history by formula ID
 * @param {Array} historyData - Array of history data
 * @param {string} formulaId - Formula ID to filter by
 * @returns {Array} - Filtered history data
 */
export const filterHistoryByFormulaId = (historyData, formulaId) => {
  if (!historyData || !Array.isArray(historyData) || !formulaId) return historyData;
  
  return historyData.filter(history => history.formulaId === formulaId);
};

/**
 * Search history by name
 * @param {Array} historyData - Array of history data
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered history data
 */
export const searchHistoryByName = (historyData, searchTerm) => {
  if (!historyData || !Array.isArray(historyData) || !searchTerm) return historyData;
  
  return historyData.filter(history => 
    history.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort history by date
 * @param {Array} historyData - Array of history data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted history data
 */
export const sortHistoryByDate = (historyData, order = 'desc') => {
  if (!historyData || !Array.isArray(historyData)) return [];
  
  return [...historyData].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    const comparison = dateA - dateB;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort history by action
 * @param {Array} historyData - Array of history data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted history data
 */
export const sortHistoryByAction = (historyData, order = 'asc') => {
  if (!historyData || !Array.isArray(historyData)) return [];
  
  return [...historyData].sort((a, b) => {
    const comparison = a.action.localeCompare(b.action);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Get history statistics
 * @param {Array} historyData - Array of history data
 * @returns {Object} - Statistics object
 */
export const getHistoryStatistics = (historyData) => {
  if (!historyData || !Array.isArray(historyData)) {
    return {
      total: 0,
      byAction: {},
      byStatus: { active: 0, inactive: 0 },
      byFormula: {},
      totalVariables: 0
    };
  }
  
  const stats = {
    total: historyData.length,
    byAction: {},
    byStatus: { active: 0, inactive: 0 },
    byFormula: {},
    totalVariables: 0
  };
  
  historyData.forEach(history => {
    // Count by action
    stats.byAction[history.action] = (stats.byAction[history.action] || 0) + 1;
    
    // Count by status
    if (history.isActive) {
      stats.byStatus.active++;
    } else {
      stats.byStatus.inactive++;
    }
    
    // Count by formula
    stats.byFormula[history.formulaId] = (stats.byFormula[history.formulaId] || 0) + 1;
    
    // Count total variables
    if (history.variables && Array.isArray(history.variables)) {
      stats.totalVariables += history.variables.length;
    }
  });
  
  return stats;
};
