import useSWR from "swr";
import { fetcherMuatrans } from "@/lib/axios";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

/**
 * Fetcher function to get margin list
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getMarginList = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatrans;
  return fetcher.get(url);
};

/**
 * Mock data for development/testing
 */
export const mockMarginListData = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    id: "uuid-margin-id",
    percentage: 10,
    model: "ADDITIONAL",
    validFrom: "2025-09-10",
    action: "UPDATE",
    createdAt: "2025-09-01T10:00:00Z",
    createdBy: "Backend BO GM"
  },
  Type: "success"
};

/**
 * Mock function for development/testing
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - Mock API response
 */
export const getMarginListMock = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: mockMarginListData,
    error: null
  };
};

/**
 * Transform margin data for table display
 * @param {Object} marginData - Raw margin data
 * @returns {Object} - Transformed data for table
 */
export const transformMarginListToTableData = (marginData) => {
  if (!marginData) return null;

  return {
    id: marginData.id,
    percentage: marginData.percentage,
    model: marginData.model,
    validFrom: marginData.validFrom,
    action: marginData.action,
    createdAt: marginData.createdAt,
    createdBy: marginData.createdBy,
    // Formatted display values
    percentageFormatted: `${marginData.percentage}%`,
    modelFormatted: marginData.model === "ADDITIONAL" ? "Additional" : "Include",
    validFromFormatted: marginData.validFrom ? new Date(marginData.validFrom).toLocaleDateString("id-ID") : "-",
    createdAtFormatted: marginData.createdAt ? `${new Date(marginData.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })} ${new Date(marginData.createdAt).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    })}` : "-",
    actionFormatted: marginData.action === "UPDATE" ? "Update" : marginData.action === "CREATE" ? "Create" : "Delete"
  };
};

/**
 * Transform margin data for form usage
 * @param {Object} marginData - Raw margin data
 * @returns {Object} - Transformed data for form
 */
export const transformMarginListToFormData = (marginData) => {
  if (!marginData) return null;

  return {
    id: marginData.id,
    percentage: marginData.percentage,
    model: marginData.model,
    validFrom: marginData.validFrom ? new Date(marginData.validFrom) : null,
    action: marginData.action,
    createdAt: marginData.createdAt,
    createdBy: marginData.createdBy
  };
};

/**
 * Build query string for margin list
 * @param {Object} params - Query parameters
 * @returns {string} - Query string
 */
export const buildMarginListQuery = (params = {}) => {
  const { search = "", page = 1, limit = 10 } = params;
  
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  
  return queryParams.toString();
};

/**
 * SWR hook for fetching margin list
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetMarginList = (params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10 } = params;
  
  const queryString = buildMarginListQuery({ search, page, limit });
  const cacheKey = `/v1/bo/pricing/setting/margin${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(cacheKey, getMarginList, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
    ...options,
  });

  return { data, error, isLoading, mutate };
};

/**
 * Get margin list for table display
 * @param {Object} params - Query parameters
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with table data
 */
export const useGetMarginListForTable = (params = {}, options = {}) => {
  const { data, error, isLoading, mutate } = useGetMarginList(params, options);
  
  return {
    data: data?.data?.Data ? transformMarginListToTableData(data.data.Data) : null,
    error,
    isLoading,
    mutate
  };
};

/**
 * Get margin list for form usage
 * @param {Object} params - Query parameters
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with form data
 */
export const useGetMarginListForForm = (params = {}, options = {}) => {
  const { data, error, isLoading, mutate } = useGetMarginList(params, options);
  
  return {
    data: data?.data?.Data ? transformMarginListToFormData(data.data.Data) : null,
    error,
    isLoading,
    mutate
  };
};
