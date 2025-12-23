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
    id: "731df77a-a9df-43df-9564-fba370e1d38c",
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
    isActive: false,
    updatedAt: "2025-09-22T10:33:40.648Z"
  },
  Type: "/v1/bo/pricing/master/route/status/731df77a-a9df-43df-9564-fba370e1d38c"
};

/**
 * Update route status by ID
 * @param {string} routeId - Route ID to update
 * @param {Object} statusData - Status data to update
 * @param {boolean} statusData.isActive - New status value
 * @returns {Promise} - Axios response promise
 */
export const patchStatusRoute = async (routeId, statusData) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }

  if (!statusData || typeof statusData.isActive !== "boolean") {
    throw new Error("statusData.isActive parameter is required and must be boolean");
  }

  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = `/v1/bo/pricing/master/route/status/${routeId}`;
  
  return fetcher.patch(url, statusData);
};

/**
 * Update route status with mock data for development
 * @param {string} routeId - Route ID to update
 * @param {Object} statusData - Status data to update
 * @param {boolean} statusData.isActive - New status value
 * @returns {Promise} - Mock data promise
 */
export const patchStatusRouteMock = async (routeId, statusData) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }

  if (!statusData || typeof statusData.isActive !== "boolean") {
    throw new Error("statusData.isActive parameter is required and must be boolean");
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: routeId,
      isActive: statusData.isActive,
      updatedAt: new Date().toISOString()
    },
    Type: `/v1/bo/pricing/master/route/status/${routeId}`
  };
};

/**
 * Transform API response data to table format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for table usage
 */
export const transformStatusUpdateResponse = (apiData) => {
  if (!apiData) return {};

  return {
    id: apiData.id,
    alias: apiData.alias || "",
    originProvinces: apiData.originProvinces?.map(province => province.name).join(", ") || "",
    destinationProvinces: apiData.destinationProvinces?.map(province => province.name).join(", ") || "",
    isActive: apiData.isActive || false,
    updatedAt: apiData.updatedAt,
    // Formatted display values
    updatedAtFormatted: apiData.updatedAt ? new Date(apiData.updatedAt).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : "",
    // Keep original data for other uses
    originProvincesData: apiData.originProvinces || [],
    destinationProvincesData: apiData.destinationProvinces || [],
  };
};

/**
 * Update route status with error handling
 * @param {string} routeId - Route ID to update
 * @param {boolean} isActive - New status value
 * @param {Object} options - Additional options
 * @param {boolean} options.useMock - Whether to use mock data
 * @returns {Promise} - Promise with success/error result
 */
export const updateRouteStatus = async (routeId, isActive, options = {}) => {
  const { useMock = false } = options;

  try {
    const statusData = { isActive };
    
    let response;
    if (useMock) {
      response = await patchStatusRouteMock(routeId, statusData);
    } else {
      response = await patchStatusRoute(routeId, statusData);
    }

    return {
      success: true,
      data: response.data?.Data || response.Data,
      message: response.data?.Message?.Text || response.Message?.Text || "Status updated successfully",
      transformedData: transformStatusUpdateResponse(response.data?.Data || response.Data)
    };
  } catch (error) {
    console.error("Error updating route status:", error);
    
    return {
      success: false,
      error: error.message || "Failed to update route status",
      details: error.response?.data || error
    };
  }
};

/**
 * Batch update multiple route statuses
 * @param {Array} updates - Array of update objects
 * @param {string} updates[].routeId - Route ID
 * @param {boolean} updates[].isActive - New status value
 * @param {Object} options - Additional options
 * @param {boolean} options.useMock - Whether to use mock data
 * @returns {Promise} - Promise with batch results
 */
export const batchUpdateRouteStatuses = async (updates, options = {}) => {
  const { useMock = false } = options;

  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error("updates parameter must be a non-empty array");
  }

  try {
    const results = await Promise.allSettled(
      updates.map(update => 
        updateRouteStatus(update.routeId, update.isActive, { useMock })
      )
    );

    const successful = results
      .filter(result => result.status === "fulfilled" && result.value.success)
      .map(result => result.value);

    const failed = results
      .filter(result => result.status === "rejected" || (result.status === "fulfilled" && !result.value.success))
      .map((result, index) => ({
        routeId: updates[index].routeId,
        error: result.status === "rejected" ? result.reason : result.value.error
      }));

    return {
      success: failed.length === 0,
      successful,
      failed,
      total: updates.length,
      successCount: successful.length,
      failureCount: failed.length
    };
  } catch (error) {
    console.error("Error in batch update:", error);
    
    return {
      success: false,
      error: error.message || "Failed to perform batch update",
      successful: [],
      failed: updates.map(update => ({
        routeId: update.routeId,
        error: error.message || "Unknown error"
      })),
      total: updates.length,
      successCount: 0,
      failureCount: updates.length
    };
  }
};

/**
 * Validate status update data
 * @param {string} routeId - Route ID
 * @param {Object} statusData - Status data
 * @returns {Object} - Validation result
 */
export const validateStatusUpdate = (routeId, statusData) => {
  const errors = [];

  if (!routeId || typeof routeId !== "string") {
    errors.push("routeId must be a non-empty string");
  }

  if (!statusData || typeof statusData !== "object") {
    errors.push("statusData must be an object");
  } else {
    if (typeof statusData.isActive !== "boolean") {
      errors.push("statusData.isActive must be a boolean");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
