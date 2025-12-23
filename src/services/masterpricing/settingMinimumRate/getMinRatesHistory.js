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
  Data: {
    data: [
      {
        id: "d89f5992-09dd-4aa8-a5b5-0cf7300f07cb",
        action: "CREATE",
        updatedAt: "2025-09-19T09:09:28.556Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-19T09:09:28.556Z"
      },
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        action: "UPDATE",
        updatedAt: "2025-09-18T14:30:15.123Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-18T14:30:15.123Z"
      },
      {
        id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
        action: "UPDATE",
        updatedAt: "2025-09-17T10:45:30.456Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-17T10:45:30.456Z"
      },
      {
        id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
        action: "UPDATE",
        updatedAt: "2025-09-16T16:20:10.789Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-16T16:20:10.789Z"
      },
      {
        id: "d4e5f6g7-h8i9-0123-defg-456789012345",
        action: "UPDATE",
        updatedAt: "2025-09-15T11:35:25.012Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-15T11:35:25.012Z"
      },
      {
        id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
        action: "UPDATE",
        updatedAt: "2025-09-14T08:15:40.345Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-14T08:15:40.345Z"
      },
      {
        id: "f6g7h8i9-j0k1-2345-fghi-678901234567",
        action: "UPDATE",
        updatedAt: "2025-09-13T13:25:55.678Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-13T13:25:55.678Z"
      },
      {
        id: "g7h8i9j0-k1l2-3456-ghij-789012345678",
        action: "UPDATE",
        updatedAt: "2025-09-12T09:40:20.901Z",
        updatedBy: "Backend BO GM",
        createdAt: "2025-09-12T09:40:20.901Z"
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 8,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    }
  },
  Type: "/v1/bo/pricing/setting/min-rates/history"
};

/**
 * Fetcher function to get min rates history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getMinRatesHistory = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformMinRatesHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((history) => {
    const createdDate = new Date(history.createdAt);
    const updatedDate = new Date(history.updatedAt);
    
    return {
      id: history.id,
      action: history.action,
      createdAt: history.createdAt,
      updatedAt: history.updatedAt,
      createdBy: history.createdBy,
      updatedBy: history.updatedBy,
      // Formatted display values
      createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      updatedAtFormatted: `${updatedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${updatedDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      actionText: getActionDisplayText(history.action),
      actionColor: getActionColorClass(history.action),
      actionBadge: getActionBadgeClass(history.action),
      // Additional info
      isCreate: history.action === "CREATE",
      isUpdate: history.action === "UPDATE",
      isDelete: history.action === "DELETE",
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
 * Build query parameters for min rates history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action (CREATE, UPDATE, DELETE)
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @returns {string} - Query string
 */
export const buildMinRatesHistoryQuery = ({ 
  search = "", 
  page = 1, 
  limit = 10, 
  action = "",
  dateFrom = "",
  dateTo = ""
} = {}) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append("search", search);
  }
  
  if (action) {
    params.append("action", action);
  }
  
  if (dateFrom) {
    params.append("dateFrom", dateFrom);
  }
  
  if (dateTo) {
    params.append("dateTo", dateTo);
  }
  
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  
  return params.toString();
};

/**
 * SWR hook for fetching min rates history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetMinRatesHistory = (params = {}, options = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 10, 
    action = "",
    dateFrom = "",
    dateTo = ""
  } = params;
  
  const queryString = buildMinRatesHistoryQuery({ search, page, limit, action, dateFrom, dateTo });
  const cacheKey = `/v1/bo/pricing/setting/min-rates/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getMinRatesHistory, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get min rates history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @returns {Promise} - Mock data promise
 */
export const getMinRatesHistoryMock = async (params = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 10, 
    action = "",
    dateFrom = "",
    dateTo = ""
  } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data.data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(history => 
      history.action.toLowerCase().includes(search.toLowerCase()) ||
      history.createdBy?.toLowerCase().includes(search.toLowerCase()) ||
      history.updatedBy?.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply action filter
  if (action) {
    filteredData = filteredData.filter(history => 
      history.action.toLowerCase() === action.toLowerCase()
    );
  }
  
  // Apply date filters
  if (dateFrom) {
    const fromDate = new Date(dateFrom);
    filteredData = filteredData.filter(history => 
      new Date(history.createdAt) >= fromDate
    );
  }
  
  if (dateTo) {
    const toDate = new Date(dateTo);
    filteredData = filteredData.filter(history => 
      new Date(history.createdAt) <= toDate
    );
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      data: paginatedData,
      pagination: {
        ...mockAPIResult.Data.pagination,
        page: page,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        hasNext: endIndex < filteredData.length,
        hasPrev: page > 1,
      }
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
 * Get action badge class
 * @param {string} action - Action code
 * @returns {string} - CSS class for badge
 */
export const getActionBadgeClass = (action) => {
  const badgeMap = {
    CREATE: "bg-green-100 text-green-800 border-green-200",
    UPDATE: "bg-blue-100 text-blue-800 border-blue-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
    ACTIVATE: "bg-green-100 text-green-800 border-green-200",
    DEACTIVATE: "bg-orange-100 text-orange-800 border-orange-200"
  };
  
  return badgeMap[action] || "bg-gray-100 text-gray-800 border-gray-200";
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
 * Filter history by date range
 * @param {Array} historyData - Array of history data
 * @param {Date} dateFrom - Start date
 * @param {Date} dateTo - End date
 * @returns {Array} - Filtered history data
 */
export const filterHistoryByDateRange = (historyData, dateFrom, dateTo) => {
  if (!historyData || !Array.isArray(historyData)) return historyData;
  
  return historyData.filter(history => {
    const historyDate = new Date(history.createdAt);
    
    if (dateFrom && historyDate < dateFrom) return false;
    if (dateTo && historyDate > dateTo) return false;
    
    return true;
  });
};

/**
 * Search history by user
 * @param {Array} historyData - Array of history data
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered history data
 */
export const searchHistoryByUser = (historyData, searchTerm) => {
  if (!historyData || !Array.isArray(historyData) || !searchTerm) return historyData;
  
  return historyData.filter(history => 
    history.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.updatedBy?.toLowerCase().includes(searchTerm.toLowerCase())
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
      byUser: {},
      byMonth: {},
      recent: 0
    };
  }
  
  const stats = {
    total: historyData.length,
    byAction: {},
    byUser: {},
    byMonth: {},
    recent: 0
  };
  
  // Calculate recent (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  historyData.forEach(history => {
    // Count by action
    stats.byAction[history.action] = (stats.byAction[history.action] || 0) + 1;
    
    // Count by user
    const user = history.createdBy || history.updatedBy || 'Unknown';
    stats.byUser[user] = (stats.byUser[user] || 0) + 1;
    
    // Count by month
    const date = new Date(history.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    stats.byMonth[monthKey] = (stats.byMonth[monthKey] || 0) + 1;
    
    // Count recent
    if (new Date(history.createdAt) >= sevenDaysAgo) {
      stats.recent++;
    }
  });
  
  return stats;
};

/**
 * Get recent history (last N days)
 * @param {Array} historyData - Array of history data
 * @param {number} days - Number of recent days
 * @returns {Array} - Recent history data
 */
export const getRecentHistory = (historyData, days = 7) => {
  if (!historyData || !Array.isArray(historyData)) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return historyData.filter(history => {
    const historyDate = new Date(history.createdAt);
    return historyDate >= cutoffDate;
  });
};

/**
 * Get history by user
 * @param {Array} historyData - Array of history data
 * @param {string} user - User name
 * @returns {Array} - Filtered history data
 */
export const getHistoryByUser = (historyData, user) => {
  if (!historyData || !Array.isArray(historyData) || !user) return [];
  
  return historyData.filter(history => 
    history.createdBy === user || history.updatedBy === user
  );
};

/**
 * Get history by action
 * @param {Array} historyData - Array of history data
 * @param {string} action - Action type
 * @returns {Array} - Filtered history data
 */
export const getHistoryByAction = (historyData, action) => {
  if (!historyData || !Array.isArray(historyData) || !action) return [];
  
  return historyData.filter(history => history.action === action);
};

/**
 * Get history summary
 * @param {Array} historyData - Array of history data
 * @returns {Object} - Summary object
 */
export const getHistorySummary = (historyData) => {
  if (!historyData || !Array.isArray(historyData)) {
    return {
      total: 0,
      lastUpdate: null,
      mostActiveUser: null,
      mostCommonAction: null
    };
  }
  
  const stats = getHistoryStatistics(historyData);
  
  // Find most active user
  const mostActiveUser = Object.keys(stats.byUser).reduce((a, b) => 
    stats.byUser[a] > stats.byUser[b] ? a : b, null
  );
  
  // Find most common action
  const mostCommonAction = Object.keys(stats.byAction).reduce((a, b) => 
    stats.byAction[a] > stats.byAction[b] ? a : b, null
  );
  
  // Find last update
  const sortedByDate = sortHistoryByDate(historyData, 'desc');
  const lastUpdate = sortedByDate.length > 0 ? sortedByDate[0].createdAt : null;
  
  return {
    total: stats.total,
    lastUpdate,
    mostActiveUser,
    mostCommonAction,
    recent: stats.recent
  };
};
