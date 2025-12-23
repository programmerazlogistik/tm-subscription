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
      id: "uuid-margin-id-1",
      percentage: 10,
      model: "ADDITIONAL",
      validFrom: "2025-09-10",
      action: "UPDATE",
      createdAt: "2025-09-01T10:00:00Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "uuid-margin-id-2",
      percentage: 15,
      model: "INCLUDE",
      validFrom: "2025-09-15",
      action: "CREATE",
      createdAt: "2025-09-02T14:30:00Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "uuid-margin-id-3",
      percentage: 8,
      model: "ADDITIONAL",
      validFrom: "2025-09-20",
      action: "DELETE",
      createdAt: "2025-09-03T09:15:00Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "uuid-margin-id-4",
      percentage: 12,
      model: "INCLUDE",
      validFrom: "2025-09-25",
      action: "UPDATE",
      createdAt: "2025-09-04T16:45:00Z",
      createdBy: "Backend BO GM"
    },
    {
      id: "uuid-margin-id-5",
      percentage: 20,
      model: "ADDITIONAL",
      validFrom: "2025-09-30",
      action: "CREATE",
      createdAt: "2025-09-05T11:20:00Z",
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
  Type: "/v1/bo/pricing/margin/history"
};

/**
 * Fetcher function to get margin history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getMarginHistory = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformMarginHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((margin) => ({
    id: margin.id,
    percentage: margin.percentage,
    model: margin.model,
    validFrom: margin.validFrom,
    action: margin.action,
    createdAt: margin.createdAt,
    createdBy: margin.createdBy,
    // Formatted display values
    percentageFormatted: `${margin.percentage}%`,
    modelFormatted: margin.model === "ADDITIONAL" ? "Ditambahkan ke hasil rumus pricing" : "Termasuk di dalam hasil rumus pricing",
    modelColor: margin.model === "ADDITIONAL" ? "text-blue-600" : "text-green-600",
    modelBadge: margin.model === "ADDITIONAL" 
      ? "bg-blue-100 text-blue-800 border-blue-200" 
      : "bg-green-100 text-green-800 border-green-200",
    validFromFormatted: margin.validFrom 
      ? new Date(margin.validFrom).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      : "-",
    createdAtFormatted: margin.createdAt 
      ? new Date(margin.createdAt).toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
    actionFormatted: margin.action === "CREATE" ? "Buat" : 
                    margin.action === "UPDATE" ? "Update" : 
                    margin.action === "DELETE" ? "Hapus" : margin.action,
    actionColor: margin.action === "CREATE" ? "text-green-600" : 
                 margin.action === "UPDATE" ? "text-blue-600" : 
                 margin.action === "DELETE" ? "text-red-600" : "text-gray-600",
    actionBadge: margin.action === "CREATE" ? "bg-green-100 text-green-800" : 
                 margin.action === "UPDATE" ? "bg-blue-100 text-blue-800" : 
                 margin.action === "DELETE" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
  }));
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformMarginHistoryToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((margin) => ({
    value: margin.id,
    label: `${margin.percentage}% - ${margin.model === "ADDITIONAL" ? "Ditambahkan" : "Termasuk"}`,
    percentage: margin.percentage,
    model: margin.model,
    validFrom: margin.validFrom
  }));
};

/**
 * Transform API response data to select format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for select usage
 */
export const transformMarginHistoryToSelectData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((margin) => ({
    value: margin.id,
    label: `${margin.percentage}% - ${margin.model === "ADDITIONAL" ? "Ditambahkan" : "Termasuk"}`,
    percentage: margin.percentage,
    model: margin.model,
    validFrom: margin.validFrom,
    action: margin.action,
    createdAt: margin.createdAt
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
 * Build query parameters for margin history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.model - Filter by model
 * @param {string} params.startDate - Start date filter
 * @param {string} params.endDate - End date filter
 * @returns {string} - Query string
 */
export const buildMarginHistoryQuery = ({ 
  search = "", 
  page = 1, 
  limit = 10, 
  action = "",
  model = "",
  startDate = "",
  endDate = ""
} = {}) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append("search", search);
  }
  
  if (action) {
    params.append("action", action);
  }
  
  if (model) {
    params.append("model", model);
  }
  
  if (startDate) {
    params.append("startDate", startDate);
  }
  
  if (endDate) {
    params.append("endDate", endDate);
  }
  
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  
  return params.toString();
};

/**
 * SWR hook for fetching margin history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.model - Filter by model
 * @param {string} params.startDate - Start date filter
 * @param {string} params.endDate - End date filter
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetMarginHistory = (params = {}, options = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 10, 
    action = "",
    model = "",
    startDate = "",
    endDate = ""
  } = params;
  
  const queryString = buildMarginHistoryQuery({ search, page, limit, action, model, startDate, endDate });
  const cacheKey = `/v1/bo/pricing/setting/margin/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getMarginHistory, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get margin history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.model - Filter by model
 * @param {string} params.startDate - Start date filter
 * @param {string} params.endDate - End date filter
 * @returns {Promise} - Mock data promise
 */
export const getMarginHistoryMock = async (params = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 10, 
    action = "",
    model = "",
    startDate = "",
    endDate = ""
  } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(margin => 
      margin.percentage.toString().includes(search) ||
      margin.model.toLowerCase().includes(search.toLowerCase()) ||
      margin.action.toLowerCase().includes(search.toLowerCase()) ||
      margin.createdBy.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply action filter
  if (action) {
    filteredData = filteredData.filter(margin => margin.action === action);
  }
  
  // Apply model filter
  if (model) {
    filteredData = filteredData.filter(margin => margin.model === model);
  }
  
  // Apply date range filter
  if (startDate || endDate) {
    filteredData = filteredData.filter(margin => {
      const marginDate = new Date(margin.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && marginDate < start) return false;
      if (end && marginDate > end) return false;
      return true;
    });
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
 * @param {string} action - Action value
 * @returns {string} - Display text
 */
export const getActionDisplayText = (action) => {
  const mapping = {
    "CREATE": "Buat",
    "UPDATE": "Update", 
    "DELETE": "Hapus"
  };
  return mapping[action] || action;
};

/**
 * Get action color class
 * @param {string} action - Action value
 * @returns {string} - CSS class
 */
export const getActionColorClass = (action) => {
  return action === "CREATE" ? "text-green-600" : 
         action === "UPDATE" ? "text-blue-600" : 
         action === "DELETE" ? "text-red-600" : "text-gray-600";
};

/**
 * Get action badge class
 * @param {string} action - Action value
 * @returns {string} - CSS class for badge
 */
export const getActionBadgeClass = (action) => {
  return action === "CREATE" ? "bg-green-100 text-green-800" : 
         action === "UPDATE" ? "bg-blue-100 text-blue-800" : 
         action === "DELETE" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
};

/**
 * Get model display text
 * @param {string} model - Model value
 * @returns {string} - Display text
 */
export const getModelDisplayText = (model) => {
  return model === "ADDITIONAL" ? "Ditambahkan ke hasil rumus pricing" : "Termasuk di dalam hasil rumus pricing";
};

/**
 * Get model color class
 * @param {string} model - Model value
 * @returns {string} - CSS class
 */
export const getModelColorClass = (model) => {
  return model === "ADDITIONAL" ? "text-blue-600" : "text-green-600";
};

/**
 * Get model badge class
 * @param {string} model - Model value
 * @returns {string} - CSS class for badge
 */
export const getModelBadgeClass = (model) => {
  return model === "ADDITIONAL" 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};

/**
 * Get margin by ID from list
 * @param {Array} marginList - Array of margins
 * @param {string} marginId - Margin ID to find
 * @returns {Object|null} - Found margin or null
 */
export const getMarginById = (marginList, marginId) => {
  if (!marginList || !Array.isArray(marginList) || !marginId) return null;
  
  return marginList.find(margin => margin.id === marginId) || null;
};

/**
 * Get margins by action
 * @param {Array} marginList - Array of margins
 * @param {string} action - Action to filter by
 * @returns {Array} - Filtered margins
 */
export const getMarginsByAction = (marginList, action) => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return marginList.filter(margin => margin.action === action);
};

/**
 * Get margins by model
 * @param {Array} marginList - Array of margins
 * @param {string} model - Model to filter by
 * @returns {Array} - Filtered margins
 */
export const getMarginsByModel = (marginList, model) => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return marginList.filter(margin => margin.model === model);
};

/**
 * Search margins by percentage
 * @param {Array} marginList - Array of margins
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered margins
 */
export const searchMarginsByPercentage = (marginList, searchTerm) => {
  if (!marginList || !Array.isArray(marginList) || !searchTerm) return marginList;
  
  return marginList.filter(margin => 
    margin.percentage.toString().includes(searchTerm)
  );
};

/**
 * Search margins by model
 * @param {Array} marginList - Array of margins
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered margins
 */
export const searchMarginsByModel = (marginList, searchTerm) => {
  if (!marginList || !Array.isArray(marginList) || !searchTerm) return marginList;
  
  return marginList.filter(margin => 
    margin.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Search margins by action
 * @param {Array} marginList - Array of margins
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered margins
 */
export const searchMarginsByAction = (marginList, searchTerm) => {
  if (!marginList || !Array.isArray(marginList) || !searchTerm) return marginList;
  
  return marginList.filter(margin => 
    margin.action.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort margins by percentage
 * @param {Array} marginList - Array of margins
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted margins
 */
export const sortMarginsByPercentage = (marginList, order = 'asc') => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return [...marginList].sort((a, b) => {
    const comparison = a.percentage - b.percentage;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort margins by created date
 * @param {Array} marginList - Array of margins
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted margins
 */
export const sortMarginsByCreatedAt = (marginList, order = 'desc') => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return [...marginList].sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    const comparison = aDate - bDate;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort margins by valid from date
 * @param {Array} marginList - Array of margins
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted margins
 */
export const sortMarginsByValidFrom = (marginList, order = 'asc') => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return [...marginList].sort((a, b) => {
    const aDate = new Date(a.validFrom);
    const bDate = new Date(b.validFrom);
    const comparison = aDate - bDate;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort margins by action
 * @param {Array} marginList - Array of margins
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted margins
 */
export const sortMarginsByAction = (marginList, order = 'asc') => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return [...marginList].sort((a, b) => {
    const comparison = a.action.localeCompare(b.action);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort margins by model
 * @param {Array} marginList - Array of margins
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted margins
 */
export const sortMarginsByModel = (marginList, order = 'asc') => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return [...marginList].sort((a, b) => {
    const comparison = a.model.localeCompare(b.model);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Get recent margins (last N days)
 * @param {Array} marginList - Array of margins
 * @param {number} days - Number of days
 * @returns {Array} - Recent margins
 */
export const getRecentMargins = (marginList, days = 7) => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return marginList.filter(margin => {
    const marginDate = new Date(margin.createdAt);
    return marginDate >= cutoffDate;
  });
};

/**
 * Get margins by date range
 * @param {Array} marginList - Array of margins
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} - Filtered margins
 */
export const getMarginsByDateRange = (marginList, startDate, endDate) => {
  if (!marginList || !Array.isArray(marginList)) return [];
  
  return marginList.filter(margin => {
    const marginDate = new Date(margin.createdAt);
    if (startDate && marginDate < startDate) return false;
    if (endDate && marginDate > endDate) return false;
    return true;
  });
};

/**
 * Get margin statistics
 * @param {Array} marginList - Array of margins
 * @returns {Object} - Statistics object
 */
export const getMarginStatistics = (marginList) => {
  if (!marginList || !Array.isArray(marginList)) {
    return {
      total: 0,
      byAction: {},
      byModel: {},
      averagePercentage: 0,
      minPercentage: 0,
      maxPercentage: 0
    };
  }
  
  const byAction = {};
  const byModel = {};
  let totalPercentage = 0;
  let minPercentage = Infinity;
  let maxPercentage = -Infinity;
  
  marginList.forEach(margin => {
    // Count by action
    byAction[margin.action] = (byAction[margin.action] || 0) + 1;
    
    // Count by model
    byModel[margin.model] = (byModel[margin.model] || 0) + 1;
    
    // Calculate percentage stats
    totalPercentage += margin.percentage;
    minPercentage = Math.min(minPercentage, margin.percentage);
    maxPercentage = Math.max(maxPercentage, margin.percentage);
  });
  
  return {
    total: marginList.length,
    byAction,
    byModel,
    averagePercentage: marginList.length > 0 ? totalPercentage / marginList.length : 0,
    minPercentage: minPercentage === Infinity ? 0 : minPercentage,
    maxPercentage: maxPercentage === -Infinity ? 0 : maxPercentage
  };
};