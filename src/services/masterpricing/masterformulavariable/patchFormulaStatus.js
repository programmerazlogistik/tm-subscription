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
    id: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
    name: "4PL",
    isActive: false,
    updatedAt: "2025-09-22T10:33:40.648Z"
  },
  Type: "/v1/bo/pricing/master/formula/status/39100e8e-f4c9-4dd2-a025-85df7a4a3f89"
};

/**
 * Fetcher function to patch formula status
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const patchFormulaStatus = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.patch(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPatchFormulaStatusResponse = (apiData) => {
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
export const transformPatchFormulaStatusRequest = (formData) => {
  if (!formData || typeof formData.isActive !== 'boolean') {
    throw new Error("Invalid form data: isActive must be a boolean");
  }

  return {
    isActive: formData.isActive,
  };
};

/**
 * Validate formula status data
 * @param {Object} data - Data to validate
 * @param {boolean} data.isActive - Active status
 * @returns {Object} - Validation result
 */
export const validateFormulaStatusData = (data) => {
  const errors = {};

  if (typeof data.isActive !== 'boolean') {
    errors.isActive = "Status harus berupa boolean";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Patch formula status with validation
 * @param {string} formulaId - Formula ID
 * @param {Object} data - Request data
 * @param {boolean} data.isActive - New active status
 * @returns {Promise} - API response promise
 */
export const patchFormulaStatusWithValidation = async (formulaId, data) => {
  // Validate data
  const validation = validateFormulaStatusData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPatchFormulaStatusRequest(data);

  // Make API call
  const response = await patchFormulaStatus(`/v1/bo/pricing/master/formula/status/${formulaId}`, requestData);
  
  // Transform response
  return transformPatchFormulaStatusResponse(response.data.Data);
};

/**
 * Patch multiple formula statuses
 * @param {Array} formulaIds - Array of formula IDs
 * @param {boolean} isActive - New active status for all
 * @returns {Promise<Array>} - Array of results
 */
export const patchMultipleFormulaStatuses = async (formulaIds, isActive) => {
  if (!Array.isArray(formulaIds) || formulaIds.length === 0) {
    throw new Error("formulaIds must be a non-empty array");
  }

  const results = [];
  const errors = [];

  for (const formulaId of formulaIds) {
    try {
      const result = await patchFormulaStatusWithValidation(formulaId, { isActive });
      results.push({ formulaId, success: true, data: result });
    } catch (error) {
      errors.push({ formulaId, success: false, error: error.message });
    }
  }

  return {
    results,
    errors,
    totalProcessed: formulaIds.length,
    successCount: results.length,
    errorCount: errors.length,
  };
};

/**
 * Patch formula status with mock data for development
 * @param {string} formulaId - Formula ID
 * @param {Object} data - Request data
 * @param {boolean} data.isActive - New active status
 * @returns {Promise} - Mock response promise
 */
export const patchFormulaStatusMock = async (formulaId, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateFormulaStatusData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Return mock response with updated status
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: formulaId,
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
 * @param {string} formulaName - Formula name
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - Confirmation message
 */
export const getStatusChangeConfirmationMessage = (formulaName, newStatus, oldStatus) => {
  const action = getStatusChangeActionText(newStatus, oldStatus);
  const statusText = getStatusDisplayText(newStatus);
  
  return `Apakah Anda yakin ingin ${action.toLowerCase()} formula "${formulaName}" menjadi "${statusText}"?`;
};

/**
 * Get success message for status change
 * @param {string} formulaName - Formula name
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @returns {string} - Success message
 */
export const getStatusChangeSuccessMessage = (formulaName, newStatus, oldStatus) => {
  const action = getStatusChangeActionText(newStatus, oldStatus);
  const statusText = getStatusDisplayText(newStatus);
  
  return `Formula "${formulaName}" berhasil ${action.toLowerCase()} menjadi "${statusText}"`;
};

/**
 * Get error message for status change
 * @param {string} formulaName - Formula name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getStatusChangeErrorMessage = (formulaName, error) => {
  return `Gagal mengubah status formula "${formulaName}": ${error.message}`;
};

/**
 * Batch update formula statuses with progress tracking
 * @param {Array} updates - Array of update objects
 * @param {string} updates[].formulaId - Formula ID
 * @param {string} updates[].formulaName - Formula name
 * @param {boolean} updates[].isActive - New active status
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Batch update result
 */
export const batchUpdateFormulaStatuses = async (updates, onProgress) => {
  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error("updates must be a non-empty array");
  }

  const results = [];
  const errors = [];
  let completed = 0;

  for (const update of updates) {
    try {
      const result = await patchFormulaStatusWithValidation(update.formulaId, { 
        isActive: update.isActive 
      });
      
      results.push({
        formulaId: update.formulaId,
        formulaName: update.formulaName,
        success: true,
        data: result,
      });

      completed++;
      if (onProgress) {
        onProgress({
          completed,
          total: updates.length,
          current: update.formulaName,
          success: true,
        });
      }
    } catch (error) {
      errors.push({
        formulaId: update.formulaId,
        formulaName: update.formulaName,
        success: false,
        error: error.message,
      });

      completed++;
      if (onProgress) {
        onProgress({
          completed,
          total: updates.length,
          current: update.formulaName,
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

/**
 * Get status change impact analysis
 * @param {string} formulaId - Formula ID
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @param {Object} dependencies - Dependencies object
 * @returns {Object} - Impact analysis
 */
export const getStatusChangeImpact = (formulaId, newStatus, oldStatus, dependencies = {}) => {
  const impact = {
    formulaId,
    newStatus,
    oldStatus,
    hasChange: newStatus !== oldStatus,
    impactLevel: "low", // low, medium, high
    affectedAreas: [],
    warnings: [],
    recommendations: []
  };

  if (!impact.hasChange) {
    return impact;
  }

  // Analyze impact based on status change
  if (newStatus && !oldStatus) {
    // Activating formula
    impact.impactLevel = "low";
    impact.affectedAreas.push("Formula akan tersedia untuk digunakan");
    impact.recommendations.push("Pastikan formula sudah teruji sebelum diaktifkan");
  } else if (!newStatus && oldStatus) {
    // Deactivating formula
    impact.impactLevel = "medium";
    impact.affectedAreas.push("Formula tidak akan tersedia untuk digunakan");
    impact.affectedAreas.push("Pricing yang menggunakan formula ini mungkin terpengaruh");
    impact.warnings.push("Pastikan tidak ada pricing aktif yang menggunakan formula ini");
    impact.recommendations.push("Periksa dependencies sebelum menonaktifkan");
  }

  return impact;
};

/**
 * Validate status change with dependencies
 * @param {string} formulaId - Formula ID
 * @param {boolean} newStatus - New status
 * @param {boolean} oldStatus - Old status
 * @param {Object} dependencies - Dependencies object
 * @returns {Object} - Validation result
 */
export const validateStatusChangeWithDependencies = (formulaId, newStatus, oldStatus, dependencies = {}) => {
  const validation = {
    isValid: true,
    warnings: [],
    errors: []
  };

  if (newStatus === oldStatus) {
    return validation;
  }

  // Check if deactivating formula with active dependencies
  if (!newStatus && oldStatus) {
    const activeDependencies = dependencies.activePricing || [];
    if (activeDependencies.length > 0) {
      validation.warnings.push(`Formula ini digunakan oleh ${activeDependencies.length} pricing aktif`);
      validation.warnings.push("Menonaktifkan formula ini dapat mempengaruhi pricing yang sedang aktif");
    }
  }

  return validation;
};

/**
 * Get status change summary
 * @param {Array} updates - Array of update results
 * @returns {Object} - Summary object
 */
export const getStatusChangeSummary = (updates) => {
  if (!Array.isArray(updates)) {
    return {
      total: 0,
      successful: 0,
      failed: 0,
      activated: 0,
      deactivated: 0,
      unchanged: 0
    };
  }

  const summary = {
    total: updates.length,
    successful: 0,
    failed: 0,
    activated: 0,
    deactivated: 0,
    unchanged: 0
  };

  updates.forEach(update => {
    if (update.success) {
      summary.successful++;
      if (update.data) {
        if (update.data.isActive) {
          summary.activated++;
        } else {
          summary.deactivated++;
        }
      }
    } else {
      summary.failed++;
    }
  });

  return summary;
};

/**
 * Get status change report
 * @param {Array} updates - Array of update results
 * @returns {string} - Report text
 */
export const getStatusChangeReport = (updates) => {
  const summary = getStatusChangeSummary(updates);
  
  let report = `Status Update Report:\n`;
  report += `Total: ${summary.total}\n`;
  report += `Berhasil: ${summary.successful}\n`;
  report += `Gagal: ${summary.failed}\n`;
  
  if (summary.activated > 0) {
    report += `Diaktifkan: ${summary.activated}\n`;
  }
  
  if (summary.deactivated > 0) {
    report += `Dinonaktifkan: ${summary.deactivated}\n`;
  }
  
  return report;
};
