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
        id: "d7b932d1-60bc-407b-a236-ee5132533a80",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440208",
        truckName: "Tractor Head 6 x 4",
        minDistance: 150,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.462Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.462Z",
        updatedBy: null
      },
      {
        id: "c5e6fff3-fe22-45d2-8034-fab59a15327f",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440207",
        truckName: "Tractor Head 4 x 2",
        minDistance: 120,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.417Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.417Z",
        updatedBy: null
      },
      {
        id: "f7ea6bf0-eaeb-4c86-9870-e07f1c23121a",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440206",
        truckName: "Medium Truck 6 x 4",
        minDistance: 100,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.362Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.362Z",
        updatedBy: null
      },
      {
        id: "e0e31a51-96c4-42dc-9040-6f8ff86b1263",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440205",
        truckName: "Medium Truck 6 x 2 (Rigid)",
        minDistance: 90,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.315Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.315Z",
        updatedBy: null
      },
      {
        id: "5a794e2e-ae9d-48e1-8b66-b08bf9f29d0c",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440204",
        truckName: "Medium Truck 4 x 2 + Gandengan",
        minDistance: 80,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.269Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.269Z",
        updatedBy: null
      },
      {
        id: "a517fd4f-30e5-4545-8366-676119958b16",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440203",
        truckName: "Medium Truk 4 x 2 (Rigid)",
        minDistance: 70,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.217Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.217Z",
        updatedBy: null
      },
      {
        id: "ae4347fb-04ec-4c3e-b69c-f17f5eb65973",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
        truckName: "Colt Diesel Double",
        minDistance: 60,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.170Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.170Z",
        updatedBy: null
      },
      {
        id: "b4250a54-5e1d-481c-9366-93fa6a7b6c33",
        truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
        truckName: "Colt Diesel Engkel",
        minDistance: 5050,
        validFrom: "2025-09-20T08:00:00.000Z",
        createdAt: "2025-09-19T09:09:28.120Z",
        createdBy: "Backend BO GM",
        updatedAt: "2025-09-19T09:09:28.120Z",
        updatedBy: null
      }
    ],
    pagination: {
      page: 1,
      limit: 50,
      total: 8,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    }
  },
  Type: "/v1/bo/pricing/setting/min-rates"
};

/**
 * Fetcher function to get min rates list
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getMinRatesList = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformMinRatesListToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((minRate) => {
    const createdDate = new Date(minRate.createdAt);
    const updatedDate = new Date(minRate.updatedAt);
    const validFromDate = new Date(minRate.validFrom);
    
    return {
      id: minRate.id,
      truckTypeId: minRate.truckTypeId,
      truckName: minRate.truckName,
      minDistance: minRate.minDistance,
      validFrom: minRate.validFrom,
      createdAt: minRate.createdAt,
      createdBy: minRate.createdBy,
      updatedAt: minRate.updatedAt,
      updatedBy: minRate.updatedBy,
      // Formatted display values
      createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      updatedAtFormatted: minRate.updatedAt ? 
        `${updatedDate.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${updatedDate.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })}` : "-",
      validFromFormatted: `${validFromDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}`,
      minDistanceFormatted: `${minRate.minDistance} km`,
      // Additional info
      isUpdated: !!minRate.updatedAt,
      hasUpdates: !!minRate.updatedBy,
      // Status based on validFrom date
      isActive: new Date(minRate.validFrom) <= new Date(),
      statusText: new Date(minRate.validFrom) <= new Date() ? "Aktif" : "Belum Aktif",
      statusColor: new Date(minRate.validFrom) <= new Date() ? "text-green-600" : "text-orange-600",
      statusBadge: new Date(minRate.validFrom) <= new Date() ? 
        "bg-green-100 text-green-800 border-green-200" : 
        "bg-orange-100 text-orange-800 border-orange-200",
    };
  });
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformMinRatesListToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((minRate) => ({
    value: minRate.id,
    label: minRate.truckName,
    minDistance: minRate.minDistance,
    validFrom: minRate.validFrom,
    isActive: new Date(minRate.validFrom) <= new Date(),
  }));
};

/**
 * Transform API response data to select format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for select usage
 */
export const transformMinRatesListToSelectData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((minRate) => ({
    value: minRate.truckTypeId,
    label: minRate.truckName,
    minDistance: minRate.minDistance,
    validFrom: minRate.validFrom,
    isActive: new Date(minRate.validFrom) <= new Date(),
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
    recordsPerPage: paginationData.limit || 50,
    hasNext: paginationData.hasNext || false,
    hasPrev: paginationData.hasPrev || false,
  };
};

/**
 * Build query parameters for min rates list API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.truckTypeId - Filter by truck type ID
 * @param {string} params.sortBy - Sort by field
 * @param {string} params.sortOrder - Sort order (asc/desc)
 * @param {string} params.status - Filter by status (active/inactive)
 * @returns {string} - Query string
 */
export const buildMinRatesListQuery = ({ 
  search = "", 
  page = 1, 
  limit = 50, 
  truckTypeId = "",
  sortBy = "",
  sortOrder = "",
  status = ""
} = {}) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append("search", search);
  }
  
  if (truckTypeId) {
    params.append("truckTypeId", truckTypeId);
  }
  
  if (sortBy) {
    params.append("sortBy", sortBy);
  }
  
  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }
  
  if (status) {
    params.append("status", status);
  }
  
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  
  return params.toString();
};

/**
 * SWR hook for fetching min rates list
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.truckTypeId - Filter by truck type ID
 * @param {string} params.sortBy - Sort by field
 * @param {string} params.sortOrder - Sort order
 * @param {string} params.status - Filter by status
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetMinRatesList = (params = {}, options = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 50, 
    truckTypeId = "",
    sortBy = "",
    sortOrder = "",
    status = ""
  } = params;
  
  const queryString = buildMinRatesListQuery({ 
    search, 
    page, 
    limit, 
    truckTypeId, 
    sortBy, 
    sortOrder, 
    status 
  });
  const cacheKey = `/v1/bo/pricing/setting/min-rates${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getMinRatesList, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get min rates list with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.truckTypeId - Filter by truck type ID
 * @param {string} params.sortBy - Sort by field
 * @param {string} params.sortOrder - Sort order
 * @param {string} params.status - Filter by status
 * @returns {Promise} - Mock data promise
 */
export const getMinRatesListMock = async (params = {}) => {
  const { 
    search = "", 
    page = 1, 
    limit = 50, 
    truckTypeId = "",
    sortBy = "",
    sortOrder = "",
    status = ""
  } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data.data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(minRate => 
      minRate.truckName.toLowerCase().includes(search.toLowerCase()) ||
      minRate.truckTypeId.toLowerCase().includes(search.toLowerCase()) ||
      minRate.createdBy?.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply truck type filter
  if (truckTypeId) {
    filteredData = filteredData.filter(minRate => 
      minRate.truckTypeId === truckTypeId
    );
  }
  
  // Apply status filter
  if (status) {
    const now = new Date();
    if (status === "active") {
      filteredData = filteredData.filter(minRate => 
        new Date(minRate.validFrom) <= now
      );
    } else if (status === "inactive") {
      filteredData = filteredData.filter(minRate => 
        new Date(minRate.validFrom) > now
      );
    }
  }
  
  // Apply sorting
  if (sortBy) {
    filteredData = [...filteredData].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "truckName":
          aValue = a.truckName;
          bValue = b.truckName;
          break;
        case "minDistance":
          aValue = a.minDistance;
          bValue = b.minDistance;
          break;
        case "validFrom":
          aValue = new Date(a.validFrom);
          bValue = new Date(b.validFrom);
          break;
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (aValue < bValue) return sortOrder === "desc" ? 1 : -1;
      if (aValue > bValue) return sortOrder === "desc" ? -1 : 1;
      return 0;
    });
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
 * Filter min rates by truck type
 * @param {Array} minRatesData - Array of min rates data
 * @param {string} truckTypeId - Truck type ID to filter by
 * @returns {Array} - Filtered min rates data
 */
export const filterMinRatesByTruckType = (minRatesData, truckTypeId) => {
  if (!minRatesData || !Array.isArray(minRatesData) || !truckTypeId) return minRatesData;
  
  return minRatesData.filter(minRate => minRate.truckTypeId === truckTypeId);
};

/**
 * Filter min rates by status
 * @param {Array} minRatesData - Array of min rates data
 * @param {string} status - Status to filter by (active/inactive)
 * @returns {Array} - Filtered min rates data
 */
export const filterMinRatesByStatus = (minRatesData, status) => {
  if (!minRatesData || !Array.isArray(minRatesData) || !status) return minRatesData;
  
  const now = new Date();
  
  if (status === "active") {
    return minRatesData.filter(minRate => new Date(minRate.validFrom) <= now);
  } else if (status === "inactive") {
    return minRatesData.filter(minRate => new Date(minRate.validFrom) > now);
  }
  
  return minRatesData;
};

/**
 * Search min rates by truck name
 * @param {Array} minRatesData - Array of min rates data
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered min rates data
 */
export const searchMinRatesByTruckName = (minRatesData, searchTerm) => {
  if (!minRatesData || !Array.isArray(minRatesData) || !searchTerm) return minRatesData;
  
  return minRatesData.filter(minRate => 
    minRate.truckName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort min rates by field
 * @param {Array} minRatesData - Array of min rates data
 * @param {string} field - Field to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted min rates data
 */
export const sortMinRatesByField = (minRatesData, field, order = 'asc') => {
  if (!minRatesData || !Array.isArray(minRatesData)) return [];
  
  return [...minRatesData].sort((a, b) => {
    let aValue, bValue;
    
    switch (field) {
      case "truckName":
        aValue = a.truckName;
        bValue = b.truckName;
        break;
      case "minDistance":
        aValue = a.minDistance;
        bValue = b.minDistance;
        break;
      case "validFrom":
        aValue = new Date(a.validFrom);
        bValue = new Date(b.validFrom);
        break;
      case "createdAt":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        aValue = a[field];
        bValue = b[field];
    }
    
    if (aValue < bValue) return order === "desc" ? 1 : -1;
    if (aValue > bValue) return order === "desc" ? -1 : 1;
    return 0;
  });
};

/**
 * Get min rates statistics
 * @param {Array} minRatesData - Array of min rates data
 * @returns {Object} - Statistics object
 */
export const getMinRatesStatistics = (minRatesData) => {
  if (!minRatesData || !Array.isArray(minRatesData)) {
    return {
      total: 0,
      active: 0,
      inactive: 0,
      byTruckType: {},
      averageMinDistance: 0,
      totalMinDistance: 0
    };
  }
  
  const stats = {
    total: minRatesData.length,
    active: 0,
    inactive: 0,
    byTruckType: {},
    averageMinDistance: 0,
    totalMinDistance: 0
  };
  
  const now = new Date();
  let totalDistance = 0;
  
  minRatesData.forEach(minRate => {
    // Count by status
    if (new Date(minRate.validFrom) <= now) {
      stats.active++;
    } else {
      stats.inactive++;
    }
    
    // Count by truck type
    stats.byTruckType[minRate.truckTypeId] = (stats.byTruckType[minRate.truckTypeId] || 0) + 1;
    
    // Sum distances
    totalDistance += minRate.minDistance;
  });
  
  stats.totalMinDistance = totalDistance;
  stats.averageMinDistance = minRatesData.length > 0 ? totalDistance / minRatesData.length : 0;
  
  return stats;
};

/**
 * Get min rates by truck type
 * @param {Array} minRatesData - Array of min rates data
 * @param {string} truckTypeId - Truck type ID
 * @returns {Object|null} - Min rate data or null
 */
export const getMinRateByTruckType = (minRatesData, truckTypeId) => {
  if (!minRatesData || !Array.isArray(minRatesData) || !truckTypeId) return null;
  
  return minRatesData.find(minRate => minRate.truckTypeId === truckTypeId) || null;
};

/**
 * Get active min rates
 * @param {Array} minRatesData - Array of min rates data
 * @returns {Array} - Active min rates data
 */
export const getActiveMinRates = (minRatesData) => {
  if (!minRatesData || !Array.isArray(minRatesData)) return [];
  
  const now = new Date();
  return minRatesData.filter(minRate => new Date(minRate.validFrom) <= now);
};

/**
 * Get inactive min rates
 * @param {Array} minRatesData - Array of min rates data
 * @returns {Array} - Inactive min rates data
 */
export const getInactiveMinRates = (minRatesData) => {
  if (!minRatesData || !Array.isArray(minRatesData)) return [];
  
  const now = new Date();
  return minRatesData.filter(minRate => new Date(minRate.validFrom) > now);
};

/**
 * Get min rates summary
 * @param {Array} minRatesData - Array of min rates data
 * @returns {Object} - Summary object
 */
export const getMinRatesSummary = (minRatesData) => {
  if (!minRatesData || !Array.isArray(minRatesData)) {
    return {
      total: 0,
      active: 0,
      inactive: 0,
      averageMinDistance: 0,
      lastUpdate: null,
      mostCommonTruckType: null
    };
  }
  
  const stats = getMinRatesStatistics(minRatesData);
  
  // Find most common truck type
  const mostCommonTruckType = Object.keys(stats.byTruckType).reduce((a, b) => 
    stats.byTruckType[a] > stats.byTruckType[b] ? a : b, null
  );
  
  // Find last update
  const sortedByDate = sortMinRatesByField(minRatesData, "updatedAt", "desc");
  const lastUpdate = sortedByDate.length > 0 ? sortedByDate[0].updatedAt : null;
  
  return {
    total: stats.total,
    active: stats.active,
    inactive: stats.inactive,
    averageMinDistance: Math.round(stats.averageMinDistance),
    lastUpdate,
    mostCommonTruckType
  };
};

/**
 * Validate min rate data
 * @param {Object} minRateData - Min rate data to validate
 * @returns {Object} - Validation result
 */
export const validateMinRateData = (minRateData) => {
  const errors = {};
  
  if (!minRateData.truckTypeId || minRateData.truckTypeId.trim() === '') {
    errors.truckTypeId = "Truck Type ID is required";
  }
  
  if (!minRateData.truckName || minRateData.truckName.trim() === '') {
    errors.truckName = "Truck Name is required";
  }
  
  if (!minRateData.minDistance || minRateData.minDistance <= 0) {
    errors.minDistance = "Minimum Distance must be greater than 0";
  }
  
  if (!minRateData.validFrom) {
    errors.validFrom = "Valid From date is required";
  } else if (new Date(minRateData.validFrom) < new Date()) {
    errors.validFrom = "Valid From date cannot be in the past";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get truck type options for dropdown
 * @param {Array} minRatesData - Array of min rates data
 * @returns {Array} - Truck type options
 */
export const getTruckTypeOptions = (minRatesData) => {
  if (!minRatesData || !Array.isArray(minRatesData)) return [];
  
  const uniqueTruckTypes = minRatesData.reduce((acc, minRate) => {
    if (!acc.find(item => item.truckTypeId === minRate.truckTypeId)) {
      acc.push({
        value: minRate.truckTypeId,
        label: minRate.truckName,
        minDistance: minRate.minDistance
      });
    }
    return acc;
  }, []);
  
  return uniqueTruckTypes;
};
