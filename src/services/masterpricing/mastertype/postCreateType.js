import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful type creation
export const mockAPIResult = {
  Message: {
    Code: 201,
    Text: "Created"
  },
  Data: {
    id: "abe5475a-9ca1-4f23-9b0f-f6c575794ecf",
    name: "New Type",
    isActive: true,
    createdAt: "2025-09-22T10:37:02.602Z",
    createdBy: "Backend BO GM"
  },
  Type: "/v1/bo/pricing/master/type"
};

/**
 * Fetcher function to create new type
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const postCreateType = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPostCreateTypeResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    // Formatted display values
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: apiData.isActive ? "text-green-600" : "text-red-600",
    statusBadge: apiData.isActive 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200",
    createdAtFormatted: apiData.createdAt 
      ? new Date(apiData.createdAt).toLocaleString("id-ID", {
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
export const transformPostCreateTypeRequest = (formData) => {
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
 * Validate type creation data
 * @param {Object} data - Data to validate
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Object} - Validation result
 */
export const validateTypeCreationData = (data) => {
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
 * Create type with validation
 * @param {Object} data - Request data
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Promise} - API response promise
 */
export const postCreateTypeWithValidation = async (data) => {
  // Validate data
  const validation = validateTypeCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPostCreateTypeRequest(data);

  // Make API call
  const response = await postCreateType("/v1/bo/pricing/master/type", requestData);
  
  // Transform response
  return transformPostCreateTypeResponse(response.data.Data);
};

/**
 * Create type with mock data for development
 * @param {Object} data - Request data
 * @param {string} data.name - Type name
 * @param {boolean} data.isActive - Active status
 * @returns {Promise} - Mock response promise
 */
export const postCreateTypeMock = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateTypeCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Generate mock ID
  const mockId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: mockId,
      name: data.name.trim(),
      isActive: data.isActive,
      createdAt: new Date().toISOString(),
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
 * Get success message for type creation
 * @param {string} typeName - Type name
 * @param {boolean} isActive - Active status
 * @returns {string} - Success message
 */
export const getTypeCreationSuccessMessage = (typeName, isActive) => {
  const statusText = getStatusDisplayText(isActive);
  return `Tipe "${typeName}" berhasil dibuat dengan status "${statusText}"`;
};

/**
 * Get error message for type creation
 * @param {string} typeName - Type name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getTypeCreationErrorMessage = (typeName, error) => {
  return `Gagal membuat tipe "${typeName}": ${error.message}`;
};

/**
 * Get confirmation message for type creation
 * @param {string} typeName - Type name
 * @param {boolean} isActive - Active status
 * @returns {string} - Confirmation message
 */
export const getTypeCreationConfirmationMessage = (typeName, isActive) => {
  const statusText = getStatusDisplayText(isActive);
  return `Apakah Anda yakin ingin membuat tipe "${typeName}" dengan status "${statusText}"?`;
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
 * Check if type name already exists (mock implementation)
 * @param {string} name - Type name
 * @param {Array} existingTypes - Array of existing types
 * @returns {boolean} - Whether name exists
 */
export const checkTypeNameExists = (name, existingTypes = []) => {
  if (!Array.isArray(existingTypes) || !name) return false;
  
  return existingTypes.some(type => 
    type.name && type.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get duplicate name error message
 * @param {string} name - Type name
 * @returns {string} - Error message
 */
export const getDuplicateNameErrorMessage = (name) => {
  return `Nama tipe "${name}" sudah digunakan. Silakan gunakan nama yang berbeda.`;
};

/**
 * Generate suggested type names
 * @param {string} baseName - Base name
 * @param {Array} existingTypes - Array of existing types
 * @returns {Array} - Array of suggested names
 */
export const generateSuggestedTypeNames = (baseName, existingTypes = []) => {
  if (!baseName) return [];
  
  const suggestions = [];
  const base = baseName.trim();
  
  // Add number suffixes
  for (let i = 1; i <= 5; i++) {
    const suggestion = `${base} ${i}`;
    if (!checkTypeNameExists(suggestion, existingTypes)) {
      suggestions.push(suggestion);
    }
  }
  
  // Add "New" prefix
  const newSuggestion = `New ${base}`;
  if (!checkTypeNameExists(newSuggestion, existingTypes)) {
    suggestions.push(newSuggestion);
  }
  
  return suggestions.slice(0, 3); // Return max 3 suggestions
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
 * Get form validation rules
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRules = () => {
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
 * Get default form values
 * @returns {Object} - Default form values
 */
export const getDefaultFormValues = () => {
  return {
    name: "",
    isActive: true
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
