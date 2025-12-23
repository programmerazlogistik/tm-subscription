import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

/**
 * Fetcher function to get current margin settings
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getCurrentMargin = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatrans;
  try {
    const response = await fetcher.get(url);
    return response;
  } catch (error) {
    // Handle 404 specifically - when no margin is set
    if (error.response && error.response.status === 404) {
      return {
        data: {
          Message: {
            Code: 404,
            Text: "Not Found",
          },
          Data: null,
          Type: "/v1/bo/pricing/setting/margin",
        },
      };
    }
    // Re-throw other errors
    throw error;
  }
};

/**
 * Mock data for development/testing
 */
export const mockCurrentMarginData = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    id: "e715ce49-8c68-414a-9c51-0f0bf2431d01",
    percentage: 89,
    model: "INCLUDE",
    validFrom: "2025-10-06",
    action: "UPDATE",
    createdAt: "2025-10-30T15:44:06.089Z",
    createdBy: "Backend BO GM",
  },
  Type: "/v1/bo/pricing/setting/margin",
};

/**
 * Mock function for development/testing
 * @returns {Promise<Object>} - Mock API response
 */
export const getCurrentMarginMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockCurrentMarginData,
    error: null,
  };
};

/**
 * Transform current margin data for display
 * @param {Object} marginData - Raw margin data
 * @returns {Object} - Transformed data for display
 */
export const transformCurrentMarginToDisplayData = (marginData) => {
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
    modelFormatted:
      marginData.model === "ADDITIONAL" ? "Additional" : "Include",
    validFromFormatted: marginData.validFrom
      ? new Date(marginData.validFrom).toLocaleDateString("id-ID")
      : "-",
    createdAtFormatted: marginData.createdAt
      ? `${new Date(marginData.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${new Date(marginData.createdAt).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "-",
    actionFormatted:
      marginData.action === "UPDATE"
        ? "Update"
        : marginData.action === "CREATE"
          ? "Create"
          : "Delete",
  };
};

/**
 * Transform current margin data for form usage
 * @param {Object} marginData - Raw margin data
 * @returns {Object} - Transformed data for form
 */
export const transformCurrentMarginToFormData = (marginData) => {
  if (!marginData) return null;

  return {
    id: marginData.id,
    percentage: marginData.percentage,
    model: marginData.model,
    validFrom: marginData.validFrom ? new Date(marginData.validFrom) : null,
    action: marginData.action,
    createdAt: marginData.createdAt,
    createdBy: marginData.createdBy,
  };
};

/**
 * SWR hook for fetching current margin settings
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetCurrentMargin = (options = {}) => {
  const cacheKey = "/v1/bo/pricing/setting/margin";

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    getCurrentMargin,
    {
      // Default SWR options
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
      ...options,
    }
  );

  return { data, error, isLoading, mutate };
};

/**
 * Get current margin for display
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with display data
 */
export const useGetCurrentMarginForDisplay = (options = {}) => {
  const { data, error, isLoading, mutate } = useGetCurrentMargin(options);

  return {
    data: data?.data?.Data
      ? transformCurrentMarginToDisplayData(data.data.Data)
      : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Get current margin for form usage
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with form data
 */
export const useGetCurrentMarginForForm = (options = {}) => {
  const { data, error, isLoading, mutate } = useGetCurrentMargin(options);

  return {
    data: data?.data?.Data
      ? transformCurrentMarginToFormData(data.data.Data)
      : null,
    error,
    isLoading,
    mutate,
  };
};
