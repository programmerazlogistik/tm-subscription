import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful type update
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    id: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
    name: "Updated Type Name",
    isActive: true,
    updatedAt: "2025-09-22T10:45:30.648Z",
    updatedBy: "Backend BO GM"
  },
  Type: "/v1/bo/pricing/master/type/67ff9e7e-d3cb-48fe-8a1e-3b492915ce54"
};

/**
 * Fetcher function to update type
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const putTypeMaster = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.put(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPutTypeMasterResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    updatedAt: apiData.updatedAt,
    updatedBy: apiData.updatedBy,
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
 * Transform form data for API request
 * @param {Object} formData - Form data
 * @param {string} formData.name - Type name
 * @param {boolean} formData.isActive - Active status
 * @returns {Object} - Transformed request data
 */
export const transformPutTypeMasterRequest = (formData) => {
  if (!formData) {
    throw new Error("Form data is required");
  }

  const { name, isActive } = formData;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error("Name is required and must be a non-empty string");
  }

  if (typeof isActive !== 'boolean') {
    throw new Error("isActive must be a boolean value");
  }

  return {
    name: name.trim(),
    isActive: isActive,
  };
};

/**
 * Validate type update data
 * @param {Object} data - Data to validate
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Object} - Validation result
 */
export const validateTypeUpdateData = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.name = "Nama tipe wajib diisi";
  } else if (data.name.trim().length < 2) {
    errors.name = "Nama tipe minimal 2 karakter";
  } else if (data.name.trim().length > 100) {
    errors.name = "Nama tipe maksimal 100 karakter";
  }

  if (typeof data.isActive !== 'boolean') {
    errors.isActive = "Status harus berupa boolean";
  }

  // Check for special characters (optional validation)
  if (data.name && /[<>\"'&]/.test(data.name)) {
    errors.name = "Nama tipe tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Update type with validation
 * @param {string} typeId - Type ID
 * @param {Object} data - Request data
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Promise} - API response promise
 */
export const putTypeMasterWithValidation = async (typeId, data) => {
  // Validate data
  const validation = validateTypeUpdateData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPutTypeMasterRequest(data);

  // Make API call
  const response = await putTypeMaster(`/v1/bo/pricing/master/type/${typeId}`, requestData);
  
  // Transform response
  return transformPutTypeMasterResponse(response.data.Data);
};

/**
 * Update type with mock data for development
 * @param {string} typeId - Type ID
 * @param {Object} data - Request data
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Promise} - Mock response promise
 */
export const putTypeMasterMock = async (typeId, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateTypeUpdateData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: typeId,
      name: data.name.trim(),
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
 * Get success message for type update
 * @param {string} typeName - Type name
 * @param {boolean} isActive - Active status
 * @returns {string} - Success message
 */
export const getTypeUpdateSuccessMessage = (typeName, isActive) => {
  const statusText = getStatusDisplayText(isActive);
  return `Tipe "${typeName}" berhasil diperbarui dengan status "${statusText}"`;
};

/**
 * Get error message for type update
 * @param {string} typeName - Type name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getTypeUpdateErrorMessage = (typeName, error) => {
  return `Gagal memperbarui tipe "${typeName}": ${error.message}`;
};

/**
 * Get confirmation message for type update
 * @param {string} typeName - Type name
 * @param {boolean} isActive - Active status
 * @returns {string} - Confirmation message
 */
export const getTypeUpdateConfirmationMessage = (typeName, isActive) => {
  const statusText = getStatusDisplayText(isActive);
  return `Apakah Anda yakin ingin memperbarui tipe "${typeName}" dengan status "${statusText}"?`;
};

/**
 * Check if type data has changes
 * @param {Object} originalData - Original data
 * @param {Object} newData - New data
 * @returns {Object} - Change detection result
 */
export const detectTypeChanges = (originalData, newData) => {
  if (!originalData || !newData) {
    return { hasChanges: false, changes: {} };
  }

  const changes = {};
  let hasChanges = false;

  // Check name changes
  if (originalData.name !== newData.name) {
    changes.name = {
      from: originalData.name,
      to: newData.name,
      changed: true
    };
    hasChanges = true;
  }

  // Check status changes
  if (originalData.isActive !== newData.isActive) {
    changes.isActive = {
      from: originalData.isActive,
      to: newData.isActive,
      changed: true
    };
    hasChanges = true;
  }

  return {
    hasChanges,
    changes,
    changeCount: Object.keys(changes).length
  };
};

/**
 * Get change summary text
 * @param {Object} changes - Changes object
 * @returns {string} - Change summary
 */
export const getChangeSummaryText = (changes) => {
  if (!changes || Object.keys(changes).length === 0) {
    return "Tidak ada perubahan";
  }

  const changeList = [];

  if (changes.name) {
    changeList.push(`Nama: "${changes.name.from}" → "${changes.name.to}"`);
  }

  if (changes.isActive) {
    const fromStatus = getStatusDisplayText(changes.isActive.from);
    const toStatus = getStatusDisplayText(changes.isActive.to);
    changeList.push(`Status: "${fromStatus}" → "${toStatus}"`);
  }

  return changeList.join(", ");
};

/**
 * Check if type name is valid
 * @param {string} name - Type name
 * @returns {Object} - Validation result
 */
export const validateTypeName = (name) => {
  const errors = {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = "Nama tipe wajib diisi";
  } else if (name.trim().length < 2) {
    errors.name = "Nama tipe minimal 2 karakter";
  } else if (name.trim().length > 100) {
    errors.name = "Nama tipe maksimal 100 karakter";
  } else if (/[<>\"'&]/.test(name)) {
    errors.name = "Nama tipe tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if type name already exists (excluding current type)
 * @param {string} name - Type name
 * @param {string} currentTypeId - Current type ID
 * @param {Array} existingTypes - Array of existing types
 * @returns {boolean} - Whether name exists
 */
export const checkTypeNameExistsForUpdate = (name, currentTypeId, existingTypes = []) => {
  if (!Array.isArray(existingTypes) || !name || !currentTypeId) return false;
  
  return existingTypes.some(type => 
    type.id !== currentTypeId && 
    type.name && 
    type.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get duplicate name error message for update
 * @param {string} name - Type name
 * @returns {string} - Error message
 */
export const getDuplicateNameErrorMessageForUpdate = (name) => {
  return `Nama tipe "${name}" sudah digunakan oleh tipe lain. Silakan gunakan nama yang berbeda.`;
};

/**
 * Sanitize type name
 * @param {string} name - Type name
 * @returns {string} - Sanitized name
 */
export const sanitizeTypeName = (name) => {
  if (!name || typeof name !== 'string') return '';
  
  return name
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, 100); // Limit to 100 characters
};

/**
 * Get form validation rules for update
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRulesForUpdate = () => {
  return {
    name: {
      required: "Nama tipe wajib diisi",
      minLength: {
        value: 2,
        message: "Nama tipe minimal 2 karakter"
      },
      maxLength: {
        value: 100,
        message: "Nama tipe maksimal 100 karakter"
      },
      pattern: {
        value: /^[^<>\"'&]*$/,
        message: "Nama tipe tidak boleh mengandung karakter khusus"
      }
    },
    isActive: {
      required: "Status wajib dipilih"
    }
  };
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data
 * @returns {Object} - API format data
 */
export const transformFormToAPI = (formData) => {
  return {
    name: sanitizeTypeName(formData.name),
    isActive: Boolean(formData.isActive)
  };
};

/**
 * Transform API data to form format
 * @param {Object} apiData - API data
 * @returns {Object} - Form format data
 */
export const transformAPIToForm = (apiData) => {
  return {
    name: apiData.name || "",
    isActive: Boolean(apiData.isActive)
  };
};

/**
 * Get update confirmation with changes
 * @param {string} typeName - Type name
 * @param {Object} changes - Changes object
 * @returns {string} - Confirmation message with changes
 */
export const getUpdateConfirmationWithChanges = (typeName, changes) => {
  const changeSummary = getChangeSummaryText(changes);
  return `Apakah Anda yakin ingin memperbarui tipe "${typeName}"?\n\nPerubahan: ${changeSummary}`;
};

/**
 * Get update success message with changes
 * @param {string} typeName - Type name
 * @param {Object} changes - Changes object
 * @returns {string} - Success message with changes
 */
export const getUpdateSuccessWithChanges = (typeName, changes) => {
  const changeSummary = getChangeSummaryText(changes);
  return `Tipe "${typeName}" berhasil diperbarui.\n\nPerubahan: ${changeSummary}`;
};

/**
 * Validate update data with existing types
 * @param {Object} data - Update data
 * @param {string} currentTypeId - Current type ID
 * @param {Array} existingTypes - Array of existing types
 * @returns {Object} - Validation result
 */
export const validateTypeUpdateWithExisting = (data, currentTypeId, existingTypes = []) => {
  const validation = validateTypeUpdateData(data);
  
  if (!validation.isValid) {
    return validation;
  }

  // Check for duplicate name
  if (checkTypeNameExistsForUpdate(data.name, currentTypeId, existingTypes)) {
    return {
      isValid: false,
      errors: {
        name: getDuplicateNameErrorMessageForUpdate(data.name)
      }
    };
  }

  return validation;
};
