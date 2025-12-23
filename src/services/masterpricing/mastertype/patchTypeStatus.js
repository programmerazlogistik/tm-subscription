import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful status update
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    id: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
    name: "Low edit",
    isActive: false,
    updatedAt: "2025-09-22T10:33:40.648Z"
  },
  Type: "/v1/bo/pricing/master/type/status/67ff9e7e-d3cb-48fe-8a1e-3b492915ce54"
};

/**
 * Fetcher function to patch type status
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const patchTypeStatus = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.patch(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPatchTypeStatusResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    updatedAt: apiData.updatedAt,
    // Formatted display values
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: apiData.isActive ? "text-green-600" : "text-red-600",
    statusBadge: apiData.isActive 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200",
    updatedAtFormatted: apiData.updatedAt 
      ? new Date(apiData.updatedAt).toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null,
  };
};

/**
 * Transform request data for API
 * @param {Object} formData - Form data
 * @param {boolean} formData.isActive - New active status
 * @returns {Object} - Transformed request data
 */
export const transformPatchTypeStatusRequest = (formData) => {
  if (!formData || typeof formData.isActive !== 'boolean') {
    throw new Error("Invalid form data: isActive must be a boolean");
  }

  return {
    isActive: formData.isActive,
  };
};

/**
 * Validate type status data
 * @param {Object} data - Data to validate
 * @param {boolean} data.isActive - Active status
 * @returns {Object} - Validation result
 */
export const validateTypeStatusData = (data) => {
  const errors = {};

  if (typeof data.isActive !== 'boolean') {
    errors.isActive = "Status must be a boolean value";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Patch type status with validation
 * @param {string} typeId - Type ID
 * @param {Object} data - Request data
 * @param {boolean} data.isActive - New active status
 * @returns {Promise} - API response promise
 */
export const patchTypeStatusWithValidation = async (typeId, data) => {
  // Validate data
  const validation = validateTypeStatusData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPatchTypeStatusRequest(data);

  // Make API call
  const response = await patchTypeStatus(`/v1/bo/pricing/master/type/status/${typeId}`, requestData);
  
  // Transform response
  return transformPatchTypeStatusResponse(response.data.Data);
};

/**
 * Patch multiple type statuses
 * @param {Array} typeIds - Array of type IDs
 * @param {boolean} isActive - New active status for all
 * @returns {Promise<Array>} - Array of results
 */
export const patchMultipleTypeStatuses = async (typeIds, isActive) => {
  if (!Array.isArray(typeIds) || typeIds.length === 0) {
    throw new Error("typeIds must be a non-empty array");
  }

  const results = [];
  const errors = [];

  for (const typeId of typeIds) {
    try {
      const result = await patchTypeStatusWithValidation(typeId, { isActive });
      results.push({ typeId, success: true, data: result });
    } catch (error) {
      errors.push({ typeId, success: false, error: error.message });
    }
  }

  return {
    results,
    errors,
    totalProcessed: typeIds.length,
    successCount: results.length,
    errorCount: errors.length,
  };
};

/**
 * Patch type status with mock data for development
 * @param {string} typeId - Type ID
 * @param {Object} data - Request data
 * @param {boolean} data.isActive - New active status
 * @returns {Promise} - Mock response promise
 */
export const patchTypeStatusMock = async (typeId, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateTypeStatusData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Return mock response with updated status
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: typeId,
      isActive: data.isActive,
      updatedAt: new Date().toISOString(),
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
 * Get action text for status change
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - Action text
 */
export const getStatusChangeActionText = (newStatus, oldStatus) => {
  if (newStatus === oldStatus) return "Tidak ada perubahan";
  if (newStatus && !oldStatus) return "Diaktifkan";
  if (!newStatus && oldStatus) return "Dinonaktifkan";
  return "Status diubah";
};

/**
 * Get action color for status change
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - CSS class
 */
export const getStatusChangeActionColor = (newStatus, oldStatus) => {
  if (newStatus === oldStatus) return "text-gray-600";
  if (newStatus && !oldStatus) return "text-green-600";
  if (!newStatus && oldStatus) return "text-red-600";
  return "text-blue-600";
};

/**
 * Check if status change is valid
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {boolean} - Whether change is valid
 */
export const isValidStatusChange = (newStatus, oldStatus) => {
  return newStatus !== oldStatus;
};

/**
 * Get confirmation message for status change
 * @param {string} typeName - Type name
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - Confirmation message
 */
export const getStatusChangeConfirmationMessage = (typeName, newStatus, oldStatus) => {
  const action = getStatusChangeActionText(newStatus, oldStatus);
  const statusText = getStatusDisplayText(newStatus);
  
  return `Apakah Anda yakin ingin ${action.toLowerCase()} tipe "${typeName}" menjadi "${statusText}"?`;
};

/**
 * Get success message for status change
 * @param {string} typeName - Type name
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - Success message
 */
export const getStatusChangeSuccessMessage = (typeName, newStatus, oldStatus) => {
  const action = getStatusChangeActionText(newStatus, oldStatus);
  const statusText = getStatusDisplayText(newStatus);
  
  return `Tipe "${typeName}" berhasil ${action.toLowerCase()} menjadi "${statusText}"`;
};

/**
 * Get error message for status change
 * @param {string} typeName - Type name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getStatusChangeErrorMessage = (typeName, error) => {
  return `Gagal mengubah status tipe "${typeName}": ${error.message}`;
};

/**
 * Batch update type statuses with progress tracking
 * @param {Array} updates - Array of update objects
 * @param {string} updates[].typeId - Type ID
 * @param {string} updates[].typeName - Type name
 * @param {boolean} updates[].isActive - New active status
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Batch update result
 */
export const batchUpdateTypeStatuses = async (updates, onProgress) => {
  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error("updates must be a non-empty array");
  }

  const results = [];
  const errors = [];
  let completed = 0;

  for (const update of updates) {
    try {
      const result = await patchTypeStatusWithValidation(update.typeId, { 
        isActive: update.isActive 
      });
      
      results.push({
        typeId: update.typeId,
        typeName: update.typeName,
        success: true,
        data: result,
      });

      completed++;
      if (onProgress) {
        onProgress({
          completed,
          total: updates.length,
          current: update.typeName,
          success: true,
        });
      }
    } catch (error) {
      errors.push({
        typeId: update.typeId,
        typeName: update.typeName,
        success: false,
        error: error.message,
      });

      completed++;
      if (onProgress) {
        onProgress({
          completed,
          total: updates.length,
          current: update.typeName,
          success: false,
          error: error.message,
        });
      }
    }
  }

  return {
    results,
    errors,
    totalProcessed: updates.length,
    successCount: results.length,
    errorCount: errors.length,
    completed,
  };
};
