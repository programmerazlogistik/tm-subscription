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
    id: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
    name: "Low edit",
    isActive: true
  },
  Type: "/v1/bo/pricing/master/type/67ff9e7e-d3cb-48fe-8a1e-3b492915ce54"
};

/**
 * Fetcher function to get type detail by ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getTypeDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to form values format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for form usage
 */
export const transformTypeDetailToFormValues = (apiData) => {
  if (!apiData) return {};

  return {
    id: apiData.id,
    name: apiData.name || "",
    isActive: apiData.isActive || false,
  };
};

/**
 * Transform API response data to table format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for table usage
 */
export const transformTypeDetailToTableData = (apiData) => {
  if (!apiData) return {};

  return {
    id: apiData.id,
    name: apiData.name || "",
    isActive: apiData.isActive || false,
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
  };
};

/**
 * Transform API response data to detail page format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for detail page usage
 */
export const transformTypeDetailToDetailPage = (apiData) => {
  if (!apiData) return {};

  return {
    id: apiData.id,
    name: apiData.name || "",
    isActive: apiData.isActive || false,
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: apiData.isActive ? "text-green-600" : "text-red-600",
  };
};

/**
 * SWR hook for fetching type detail
 * @param {string} typeId - Required: ID of the type to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetTypeDetail = (typeId, options = {}) => {
  if (!typeId) {
    throw new Error("typeId parameter is required");
  }

  const cacheKey = `/v1/bo/pricing/master/type/${typeId}`;

  return useSWR(cacheKey, getTypeDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get type detail with mock data for development
 * @param {string} typeId - ID of the type to fetch
 * @returns {Promise} - Mock data promise
 */
export const getTypeDetailMock = async (typeId) => {
  if (!typeId) {
    throw new Error("typeId parameter is required");
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: typeId, // Use the provided typeId
    },
    Type: `/v1/bo/pricing/master/type/${typeId}`
  };
};

/**
 * Get type detail for form usage (edit mode)
 * @param {string} typeId - ID of the type to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with transformed form data
 */
export const useGetTypeDetailForForm = (typeId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetTypeDetail(typeId, options);
  
  const formData = data?.data?.Data ? transformTypeDetailToFormValues(data.data.Data) : null;
  
  return {
    data: formData,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};

/**
 * Get type detail for detail page usage
 * @param {string} typeId - ID of the type to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with transformed detail data
 */
export const useGetTypeDetailForDetail = (typeId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetTypeDetail(typeId, options);
  
  const detailData = data?.data?.Data ? transformTypeDetailToDetailPage(data.data.Data) : null;
  
  return {
    data: detailData,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};

/**
 * Get type detail for table usage
 * @param {string} typeId - ID of the type to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with transformed table data
 */
export const useGetTypeDetailForTable = (typeId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetTypeDetail(typeId, options);
  
  const tableData = data?.data?.Data ? transformTypeDetailToTableData(data.data.Data) : null;
  
  return {
    data: tableData,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};

/**
 * Validate type detail data
 * @param {Object} typeData - Type data to validate
 * @returns {Object} - Validation result
 */
export const validateTypeDetailData = (typeData) => {
  const errors = [];

  if (!typeData || typeof typeData !== "object") {
    errors.push("typeData must be an object");
    return { isValid: false, errors };
  }

  // Validate id
  if (!typeData.id || typeof typeData.id !== "string") {
    errors.push("id is required and must be a non-empty string");
  }

  // Validate name
  if (!typeData.name || typeof typeData.name !== "string" || typeData.name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  }

  // Validate isActive
  if (typeData.isActive !== undefined && typeof typeData.isActive !== "boolean") {
    errors.push("isActive must be a boolean if provided");
  }

  return {
    isValid: errors.length === 0,
    errors
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
