import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful margin creation
export const mockAPIResult = {
  Message: {
    Code: 201,
    Text: "Created"
  },
  Data: {
    id: "abe5475a-9ca1-4f23-9b0f-f6c575794ecf",
    percentage: 10,
    model: "ADDITIONAL",
    validFrom: "2025-09-22",
    action: "CREATE",
    createdAt: "2025-09-22T10:37:02.602Z",
    createdBy: "Backend BO GM"
  },
  Type: "/v1/bo/pricing/margin"
};

/**
 * Fetcher function to create new margin data
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const postMarginData = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPostMarginResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    percentage: apiData.percentage,
    model: apiData.model,
    validFrom: apiData.validFrom,
    action: apiData.action,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    // Formatted display values
    percentageFormatted: `${apiData.percentage}%`,
    modelFormatted: apiData.model === "ADDITIONAL" ? "Ditambahkan ke hasil rumus pricing" : "Termasuk di dalam hasil rumus pricing",
    modelColor: apiData.model === "ADDITIONAL" ? "text-blue-600" : "text-green-600",
    modelBadge: apiData.model === "ADDITIONAL" 
      ? "bg-blue-100 text-blue-800 border-blue-200" 
      : "bg-green-100 text-green-800 border-green-200",
    validFromFormatted: apiData.validFrom 
      ? new Date(apiData.validFrom).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      : null,
    createdAtFormatted: apiData.createdAt 
      ? new Date(apiData.createdAt).toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null,
    actionFormatted: apiData.action === "CREATE" ? "Buat" : 
                    apiData.action === "UPDATE" ? "Update" : 
                    apiData.action === "DELETE" ? "Hapus" : apiData.action
  };
};

/**
 * Transform form data for API request
 * @param {Object} formData - Form data
 * @param {number} formData.margin - Margin percentage
 * @param {string} formData.modelMargin - Margin model (added/included)
 * @param {Date} formData.effectiveDate - Effective date
 * @returns {Object} - Transformed request data
 */
export const transformPostMarginRequest = (formData) => {
  if (!formData) {
    throw new Error("Form data is required");
  }

  const { margin, modelMargin, effectiveDate } = formData;

  // Convert margin to number first
  const marginValue = Number(margin);
  
  if (margin === undefined || margin === null || isNaN(marginValue)) {
    throw new Error("Margin is required and must be a number");
  }
  if (marginValue < 0) {
    throw new Error("Margin must be greater than or equal to 0");
  }

  if (!modelMargin || !["added", "included"].includes(modelMargin)) {
    throw new Error("Model margin must be 'added' or 'included'");
  }

  if (!effectiveDate || !(effectiveDate instanceof Date)) {
    throw new Error("Effective date is required and must be a valid date");
  }

  // Convert modelMargin to API format
  const modelMapping = {
    "added": "ADDITIONAL",
    "included": "INCLUDE"
  };

  return {
    percentage: marginValue,
    model: modelMapping[modelMargin],
    validFrom: effectiveDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD format
  };
};

/**
 * Validate margin creation data
 * @param {Object} data - Data to validate
 * @param {number} data.margin - Margin percentage
 * @param {string} data.modelMargin - Margin model
 * @param {Date} data.effectiveDate - Effective date
 * @returns {Object} - Validation result
 */
export const validateMarginCreationData = (data) => {
  const errors = {};
  
  // Convert margin to number first
  const marginValue = Number(data.margin);
  
  if (data.margin === undefined || data.margin === null || isNaN(marginValue)) {
    errors.margin = "Margin wajib diisi";
  } else if (marginValue < 0) {
    errors.margin = "Margin harus lebih dari atau sama dengan 0";
  } else if (marginValue > 100) {
    errors.margin = "Margin tidak boleh lebih dari 100%";
  }

  if (!data.modelMargin || !["added", "included"].includes(data.modelMargin)) {
    errors.modelMargin = "Model margin wajib dipilih";
  }

  if (!data.effectiveDate || !(data.effectiveDate instanceof Date)) {
    errors.effectiveDate = "Tanggal berlaku wajib diisi";
  } else if (isNaN(data.effectiveDate.getTime())) {
    errors.effectiveDate = "Tanggal berlaku harus berupa tanggal yang valid";
  } else {
    // Validate date is not in the past
    const today = new Date();
    const inputDate = new Date(data.effectiveDate);
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    if (inputDate < today) {
      errors.effectiveDate = "Tanggal berlaku tidak boleh di masa lalu";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Create margin with validation
 * @param {Object} data - Request data
 * @param {number} data.margin - Margin percentage
 * @param {string} data.modelMargin - Margin model
 * @param {Date} data.effectiveDate - Effective date
 * @returns {Promise} - API response promise
 */
export const postMarginDataWithValidation = async (data) => {
  // Validate data
  // const validation = validateMarginCreationData(data);
  // if (!validation.isValid) {
  //   throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  // }

  // Transform request data
  const requestData = transformPostMarginRequest(data);

  // Make API call
  const response = await postMarginData("/v1/bo/pricing/setting/margin", requestData);
  
  // Transform response
  return transformPostMarginResponse(response.data.Data);
};

/**
 * Create margin with mock data for development
 * @param {Object} data - Request data
 * @param {number} data.margin - Margin percentage
 * @param {string} data.modelMargin - Margin model
 * @param {Date} data.effectiveDate - Effective date
 * @returns {Promise} - Mock response promise
 */
export const postMarginDataMock = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  data.margin = Number(data.margin);
  // Validate data
  const validation = validateMarginCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Generate mock ID
  const mockId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Transform request data
  const requestData = transformPostMarginRequest(data);

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: mockId,
      percentage: requestData.percentage,
      model: requestData.model,
      validFrom: requestData.validFrom,
      action: "CREATE",
      createdAt: new Date().toISOString(),
    }
  };
};

/**
 * Get model display text
 * @param {string} modelMargin - Model margin value
 * @returns {string} - Display text
 */
export const getModelDisplayText = (modelMargin) => {
  const mapping = {
    "added": "Ditambahkan ke hasil rumus pricing",
    "included": "Termasuk di dalam hasil rumus pricing"
  };
  return mapping[modelMargin] || modelMargin;
};

/**
 * Get model color class
 * @param {string} modelMargin - Model margin value
 * @returns {string} - CSS class
 */
export const getModelColorClass = (modelMargin) => {
  return modelMargin === "added" ? "text-blue-600" : "text-green-600";
};

/**
 * Get model badge class
 * @param {string} modelMargin - Model margin value
 * @returns {string} - CSS class for badge
 */
export const getModelBadgeClass = (modelMargin) => {
  return modelMargin === "added" 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};

/**
 * Get success message for margin creation
 * @param {number} margin - Margin percentage
 * @param {string} modelMargin - Model margin
 * @returns {string} - Success message
 */
export const getMarginCreationSuccessMessage = (margin, modelMargin) => {
  const modelText = getModelDisplayText(modelMargin);
  return `Margin ${margin}% berhasil dibuat dengan model "${modelText}"`;
};

/**
 * Get error message for margin creation
 * @param {number} margin - Margin percentage
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getMarginCreationErrorMessage = (margin, error) => {
  return `Gagal membuat margin ${margin}%: ${error.message}`;
};

/**
 * Get confirmation message for margin creation
 * @param {number} margin - Margin percentage
 * @param {string} modelMargin - Model margin
 * @returns {string} - Confirmation message
 */
export const getMarginCreationConfirmationMessage = (margin, modelMargin) => {
  const modelText = getModelDisplayText(modelMargin);
  return `Apakah Anda yakin ingin membuat margin ${margin}% dengan model "${modelText}"?`;
};

/**
 * Check if margin percentage is valid
 * @param {number} margin - Margin percentage
 * @returns {Object} - Validation result
 */
export const validateMarginPercentage = (margin) => {
  const errors = {};

  // Convert margin to number first
  const marginValue = Number(margin);
  
  if (margin === undefined || margin === null || isNaN(marginValue)) {
    errors.margin = "Margin wajib diisi";
  } else if (marginValue < 0) {
    errors.margin = "Margin harus lebih dari atau sama dengan 0";
  } else if (marginValue > 100) {
    errors.margin = "Margin tidak boleh lebih dari 100%";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if margin already exists (mock implementation)
 * @param {number} margin - Margin percentage
 * @param {Array} existingMargins - Array of existing margins
 * @returns {boolean} - Whether margin exists
 */
export const checkMarginExists = (margin, existingMargins = []) => {
  if (!Array.isArray(existingMargins) || !margin) return false;
  
  return existingMargins.some(marginData => 
    marginData.percentage && marginData.percentage === margin
  );
};

/**
 * Get duplicate margin error message
 * @param {number} margin - Margin percentage
 * @returns {string} - Error message
 */
export const getDuplicateMarginErrorMessage = (margin) => {
  return `Margin ${margin}% sudah ada. Silakan gunakan nilai yang berbeda.`;
};

/**
 * Generate suggested margin values
 * @param {number} baseMargin - Base margin value
 * @param {Array} existingMargins - Array of existing margins
 * @returns {Array} - Array of suggested values
 */
export const generateSuggestedMarginValues = (baseMargin, existingMargins = []) => {
  if (!baseMargin) return [];
  
  const suggestions = [];
  
  // Add increment values
  for (let i = 1; i <= 5; i++) {
    const suggestion = baseMargin + i;
    if (suggestion <= 100 && !checkMarginExists(suggestion, existingMargins)) {
      suggestions.push(suggestion);
    }
  }
  
  // Add decrement values
  for (let i = 1; i <= 5; i++) {
    const suggestion = baseMargin - i;
    if (suggestion >= 0 && !checkMarginExists(suggestion, existingMargins)) {
      suggestions.push(suggestion);
    }
  }
  
  return suggestions.slice(0, 5).sort((a, b) => a - b); // Return max 5 suggestions, sorted
};

/**
 * Sanitize margin percentage
 * @param {number} margin - Margin percentage
 * @returns {number} - Sanitized margin
 */
export const sanitizeMarginPercentage = (margin) => {
  if (margin === undefined || margin === null || typeof margin !== 'number') {
    return 0;
  }
  
  // Ensure margin is between 0 and 100
  return Math.max(0, Math.min(100, margin));
};

/**
 * Get form validation rules
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRules = () => {
  return {
    margin: {
      required: "Margin wajib diisi",
      min: {
        value: 0,
        message: "Margin harus lebih dari atau sama dengan 0"
      },
      max: {
        value: 100,
        message: "Margin tidak boleh lebih dari 100%"
      }
    },
    modelMargin: {
      required: "Model margin wajib dipilih"
    },
    effectiveDate: {
      required: "Tanggal berlaku wajib diisi"
    }
  };
};

/**
 * Get default form values
 * @returns {Object} - Default form values
 */
export const getDefaultFormValues = () => {
  return {
    margin: "",
    modelMargin: "added",
    effectiveDate: null
  };
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data
 * @returns {Object} - API format data
 */
export const transformFormToAPI = (formData) => {
  return {
    percentage: sanitizeMarginPercentage(Number(formData.margin)),
    model: formData.modelMargin === "added" ? "ADDITIONAL" : "INCLUDE",
    validFrom: formData.effectiveDate instanceof Date 
      ? formData.effectiveDate.toISOString().split('T')[0]
      : formData.effectiveDate
  };
};

/**
 * Transform API data to form format
 * @param {Object} apiData - API data
 * @returns {Object} - Form format data
 */
export const transformAPIToForm = (apiData) => {
  return {
    margin: apiData.percentage !== undefined && apiData.percentage !== null ? apiData.percentage : "",
    modelMargin: apiData.model === "ADDITIONAL" ? "added" : "included",
    effectiveDate: apiData.validFrom ? new Date(apiData.validFrom) : null
  };
};