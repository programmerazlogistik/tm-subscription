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
        id: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
        name: "6PL",
        isActive: true,
        createdAt: "2025-09-20T02:27:44.730Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "d9a845d1-8a88-453e-9485-ab813e43194c",
        name: "5PL",
        isActive: true,
        createdAt: "2025-09-20T02:27:23.333Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        name: "4PL",
        isActive: true,
        createdAt: "2025-09-18T16:17:49.926Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        name: "3PL",
        isActive: false,
        createdAt: "2025-09-15T10:30:15.123Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
        name: "2PL",
        isActive: true,
        createdAt: "2025-09-12T14:45:30.456Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
        name: "1PL",
        isActive: false,
        createdAt: "2025-09-10T09:15:45.789Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "d4e5f6g7-h8i9-0123-defg-456789012345",
        name: "Premium Formula",
        isActive: true,
        createdAt: "2025-09-08T16:20:10.012Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
        name: "Standard Formula",
        isActive: true,
        createdAt: "2025-09-05T11:35:25.345Z",
        createdBy: "Backend BO GM"
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
  Type: "/v1/bo/pricing/master/formula"
};

/**
 * Fetcher function to get formula list
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getFormulaList = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformFormulaListToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((formula) => {
    const createdDate = new Date(formula.createdAt);
    
    return {
      id: formula.id,
      name: formula.name,
      formulaName: formula.name, // Add formulaName field for table compatibility
      isActive: formula.isActive,
      createdAt: formula.createdAt,
      createdBy: formula.createdBy,
      // Formatted display values
      status: formula.isActive ? "Aktif" : "Tidak Aktif",
      statusColor: formula.isActive ? "text-green-600" : "text-red-600",
      statusBadge: formula.isActive 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-red-100 text-red-800 border-red-200",
      createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    };
  });
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformFormulaListToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData
    .filter(formula => formula.isActive) // Only active formulas for dropdown
    .map((formula) => ({
      value: formula.id,
      label: formula.name,
    }));
};

/**
 * Transform API response data to select format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for select usage
 */
export const transformFormulaListToSelectData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((formula) => ({
    value: formula.id,
    label: formula.name,
    isActive: formula.isActive,
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
    currentPage: paginationData.page || 1,
    totalPages: paginationData.totalPages || 1,
    totalRecords: paginationData.total || 0,
    recordsPerPage: paginationData.limit || 10,
    hasNext: paginationData.hasNext || false,
    hasPrev: paginationData.hasPrev || false,
  };
};

/**
 * Build query parameters for formula list API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @returns {string} - Query string
 */
export const buildFormulaListQuery = ({ 
  search = "", 
  page = 1, 
  limit = 10, 
  isActive = null 
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
 * SWR hook for fetching formula list
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetFormulaList = (params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, isActive = null } = params;
  
  const queryString = buildFormulaListQuery({ search, page, limit, isActive });
  const cacheKey = `/v1/bo/pricing/master/formula${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getFormulaList, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get formula list with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {boolean} params.isActive - Filter by active status
 * @returns {Promise} - Mock data promise
 */
export const getFormulaListMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, isActive = null } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data.data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(formula => 
      formula.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply active status filter
  if (isActive !== null) {
    filteredData = filteredData.filter(formula => formula.isActive === isActive);
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
 * Get formula by ID from list
 * @param {Array} formulaList - Array of formulas
 * @param {string} formulaId - Formula ID to find
 * @returns {Object|null} - Found formula or null
 */
export const getFormulaById = (formulaList, formulaId) => {
  if (!formulaList || !Array.isArray(formulaList) || !formulaId) return null;
  
  return formulaList.find(formula => formula.id === formulaId) || null;
};

/**
 * Get active formulas only
 * @param {Array} formulaList - Array of formulas
 * @returns {Array} - Active formulas only
 */
export const getActiveFormulas = (formulaList) => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  return formulaList.filter(formula => formula.isActive);
};

/**
 * Get inactive formulas only
 * @param {Array} formulaList - Array of formulas
 * @returns {Array} - Inactive formulas only
 */
export const getInactiveFormulas = (formulaList) => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  return formulaList.filter(formula => !formula.isActive);
};

/**
 * Search formulas by name
 * @param {Array} formulaList - Array of formulas
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered formulas
 */
export const searchFormulasByName = (formulaList, searchTerm) => {
  if (!formulaList || !Array.isArray(formulaList) || !searchTerm) return formulaList;
  
  return formulaList.filter(formula => 
    formula.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort formulas by name
 * @param {Array} formulaList - Array of formulas
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted formulas
 */
export const sortFormulasByName = (formulaList, order = 'asc') => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  return [...formulaList].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort formulas by status
 * @param {Array} formulaList - Array of formulas
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted formulas
 */
export const sortFormulasByStatus = (formulaList, order = 'asc') => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  return [...formulaList].sort((a, b) => {
    const comparison = a.isActive - b.isActive;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort formulas by creation date
 * @param {Array} formulaList - Array of formulas
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted formulas
 */
export const sortFormulasByDate = (formulaList, order = 'desc') => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  return [...formulaList].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    const comparison = dateA - dateB;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Get formulas count by status
 * @param {Array} formulaList - Array of formulas
 * @returns {Object} - Count by status
 */
export const getFormulasCountByStatus = (formulaList) => {
  if (!formulaList || !Array.isArray(formulaList)) return { active: 0, inactive: 0, total: 0 };
  
  const activeCount = formulaList.filter(f => f.isActive).length;
  const inactiveCount = formulaList.filter(f => !f.isActive).length;
  
  return {
    active: activeCount,
    inactive: inactiveCount,
    total: formulaList.length,
  };
};

/**
 * Get formulas count by creator
 * @param {Array} formulaList - Array of formulas
 * @returns {Object} - Count by creator
 */
export const getFormulasCountByCreator = (formulaList) => {
  if (!formulaList || !Array.isArray(formulaList)) return {};
  
  const countByCreator = {};
  formulaList.forEach(formula => {
    const creator = formula.createdBy || 'Unknown';
    countByCreator[creator] = (countByCreator[creator] || 0) + 1;
  });
  
  return countByCreator;
};

/**
 * Get formulas created in date range
 * @param {Array} formulaList - Array of formulas
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} - Filtered formulas
 */
export const getFormulasInDateRange = (formulaList, startDate, endDate) => {
  if (!formulaList || !Array.isArray(formulaList) || !startDate || !endDate) return [];
  
  return formulaList.filter(formula => {
    const formulaDate = new Date(formula.createdAt);
    return formulaDate >= startDate && formulaDate <= endDate;
  });
};

/**
 * Get recent formulas
 * @param {Array} formulaList - Array of formulas
 * @param {number} days - Number of recent days
 * @returns {Array} - Recent formulas
 */
export const getRecentFormulas = (formulaList, days = 7) => {
  if (!formulaList || !Array.isArray(formulaList)) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return formulaList.filter(formula => {
    const formulaDate = new Date(formula.createdAt);
    return formulaDate >= cutoffDate;
  });
};

/**
 * Get formulas statistics
 * @param {Array} formulaList - Array of formulas
 * @returns {Object} - Statistics object
 */
export const getFormulasStatistics = (formulaList) => {
  if (!formulaList || !Array.isArray(formulaList)) {
    return {
      total: 0,
      active: 0,
      inactive: 0,
      byCreator: {},
      recent: 0
    };
  }
  
  const stats = {
    total: formulaList.length,
    active: formulaList.filter(f => f.isActive).length,
    inactive: formulaList.filter(f => !f.isActive).length,
    byCreator: getFormulasCountByCreator(formulaList),
    recent: getRecentFormulas(formulaList, 7).length
  };
  
  return stats;
};

/**
 * Validate formula name
 * @param {string} name - Formula name
 * @returns {Object} - Validation result
 */
export const validateFormulaName = (name) => {
  const errors = {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = "Nama formula wajib diisi";
  } else if (name.trim().length < 2) {
    errors.name = "Nama formula minimal 2 karakter";
  } else if (name.trim().length > 100) {
    errors.name = "Nama formula maksimal 100 karakter";
  } else if (/[<>\"'&]/.test(name)) {
    errors.name = "Nama formula tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if formula name already exists
 * @param {string} name - Formula name
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {boolean} - Whether name exists
 */
export const checkFormulaNameExists = (name, existingFormulas = []) => {
  if (!Array.isArray(existingFormulas) || !name) return false;
  
  return existingFormulas.some(formula => 
    formula.name && formula.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get duplicate name error message
 * @param {string} name - Formula name
 * @returns {string} - Error message
 */
export const getDuplicateNameErrorMessage = (name) => {
  return `Nama formula "${name}" sudah digunakan. Silakan gunakan nama yang berbeda.`;
};

/**
 * Generate suggested formula names
 * @param {string} baseName - Base name
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {Array} - Array of suggested names
 */
export const generateSuggestedFormulaNames = (baseName, existingFormulas = []) => {
  if (!baseName) return [];
  
  const suggestions = [];
  const base = baseName.trim();
  
  // Add number suffixes
  for (let i = 1; i <= 5; i++) {
    const suggestion = `${base} ${i}`;
    if (!checkFormulaNameExists(suggestion, existingFormulas)) {
      suggestions.push(suggestion);
    }
  }
  
  // Add "New" prefix
  const newSuggestion = `New ${base}`;
  if (!checkFormulaNameExists(newSuggestion, existingFormulas)) {
    suggestions.push(newSuggestion);
  }
  
  return suggestions.slice(0, 3); // Return max 3 suggestions
};

/**
 * Sanitize formula name
 * @param {string} name - Formula name
 * @returns {string} - Sanitized name
 */
export const sanitizeFormulaName = (name) => {
  if (!name || typeof name !== 'string') return '';
  
  return name
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, 100); // Limit to 100 characters
};
