import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful formula creation
export const mockAPIResult = {
  Message: {
    Code: 201,
    Text: "Created"
  },
  Data: {
    id: "abe5475a-9ca1-4f23-9b0f-f6c575794ecf",
    name: "New Formula",
    isActive: true,
    createdAt: "2025-09-22T10:37:02.602Z",
    createdBy: "Backend BO GM",
    variables: [
      {
        id: "0a4b6d85-2026-4852-99ba-075df566130d",
        variableName: "jarak",
        isFromShipper: true,
        isActive: true,
        createdAt: "2025-09-22T10:37:02.615Z"
      },
      {
        id: "1b5c7e96-3137-5963-0acb-186ef677241e",
        variableName: "tonase",
        isFromShipper: true,
        isActive: true,
        createdAt: "2025-09-22T10:37:02.615Z"
      }
    ]
  },
  Type: "/v1/bo/pricing/master/formula"
};

/**
 * Fetcher function to create new formula
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const postCreateFormula = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPostCreateFormulaResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    variables: apiData.variables || [],
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
    variablesCount: apiData.variables ? apiData.variables.length : 0,
    variablesList: apiData.variables ? apiData.variables.map(v => v.variableName).join(", ") : "",
  };
};

/**
 * Transform form data for API request
 * @param {Object} formData - Form data
 * @param {string} formData.name - Formula name
 * @param {boolean} formData.isActive - Active status
 * @param {Array} formData.variables - Variables array
 * @returns {Object} - Transformed request data
 */
export const transformPostCreateFormulaRequest = (formData) => {
  if (!formData) {
    throw new Error("Form data is required");
  }

  const { name, isActive, variables = [] } = formData;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error("Name is required and must be a non-empty string");
  }

  if (typeof isActive !== 'boolean') {
    throw new Error("isActive must be a boolean value");
  }

  if (!Array.isArray(variables)) {
    throw new Error("Variables must be an array");
  }

  return {
    name: name.trim(),
    isActive: isActive,
    variables: variables.map(variable => ({
      variableName: variable.variableName || variable.name,
      // isFromShipper is not included in the payload
    })),
  };
};

/**
 * Validate formula creation data
 * @param {Object} data - Data to validate
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @param {Array} data.variables - Variables array
 * @returns {Object} - Validation result
 */
export const validateFormulaCreationData = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.name = "Nama formula wajib diisi";
  } else if (data.name.trim().length < 2) {
    errors.name = "Nama formula minimal 2 karakter";
  } else if (data.name.trim().length > 100) {
    errors.name = "Nama formula maksimal 100 karakter";
  }

  if (typeof data.isActive !== 'boolean') {
    errors.isActive = "Status harus berupa boolean";
  }

  if (!Array.isArray(data.variables)) {
    errors.variables = "Variables harus berupa array";
  } else if (data.variables.length === 0) {
    errors.variables = "Minimal harus ada 1 variabel";
  } else {
    // Validate each variable
    data.variables.forEach((variable, index) => {
      if (!variable.variableName && !variable.name) {
        errors[`variables.${index}.name`] = "Nama variabel wajib diisi";
      } else {
        const varName = variable.variableName || variable.name;
        if (varName.trim().length < 1) {
          errors[`variables.${index}.name`] = "Nama variabel tidak boleh kosong";
        } else if (varName.trim().length > 50) {
          errors[`variables.${index}.name`] = "Nama variabel maksimal 50 karakter";
        }
      }

      // isFromShipper validation removed - not required in payload
    });

    // Check for duplicate variable names
    const variableNames = data.variables.map(v => (v.variableName || v.name || '').trim()).filter(name => name);
    const uniqueNames = new Set(variableNames);
    if (variableNames.length !== uniqueNames.size) {
      errors.variables = "Nama variabel tidak boleh duplikat";
    }
  }

  // Check for special characters (optional validation)
  if (data.name && /[<>\"'&]/.test(data.name)) {
    errors.name = "Nama formula tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Create formula with validation
 * @param {Object} data - Request data
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @param {Array} data.variables - Variables array
 * @returns {Promise} - API response promise
 */
export const postCreateFormulaWithValidation = async (data) => {
  // Validate data
  const validation = validateFormulaCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPostCreateFormulaRequest(data);

  // Make API call
  const response = await postCreateFormula("/v1/bo/pricing/master/formula", requestData);
  
  // Transform response
  return transformPostCreateFormulaResponse(response.data.Data);
};

/**
 * Create formula with mock data for development
 * @param {Object} data - Request data
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @param {Array} data.variables - Variables array
 * @returns {Promise} - Mock response promise
 */
export const postCreateFormulaMock = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateFormulaCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Generate mock ID
  const mockId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Generate mock variable IDs
  const mockVariables = (data.variables || []).map(variable => ({
    id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    variableName: variable.variableName || variable.name,
    isActive: true,
    createdAt: new Date().toISOString()
  }));

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: mockId,
      name: data.name.trim(),
      isActive: data.isActive,
      variables: mockVariables,
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
 * Get success message for formula creation
 * @param {string} formulaName - Formula name
 * @param {boolean} isActive - Active status
 * @param {number} variablesCount - Number of variables
 * @returns {string} - Success message
 */
export const getFormulaCreationSuccessMessage = (formulaName, isActive, variablesCount = 0) => {
  const statusText = getStatusDisplayText(isActive);
  const variablesText = variablesCount === 1 ? "1 variabel" : `${variablesCount} variabel`;
  return `Formula "${formulaName}" berhasil dibuat dengan status "${statusText}" dan ${variablesText}`;
};

/**
 * Get error message for formula creation
 * @param {string} formulaName - Formula name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getFormulaCreationErrorMessage = (formulaName, error) => {
  return `Gagal membuat formula "${formulaName}": ${error.message}`;
};

/**
 * Get confirmation message for formula creation
 * @param {string} formulaName - Formula name
 * @param {boolean} isActive - Active status
 * @param {number} variablesCount - Number of variables
 * @returns {string} - Confirmation message
 */
export const getFormulaCreationConfirmationMessage = (formulaName, isActive, variablesCount = 0) => {
  const statusText = getStatusDisplayText(isActive);
  const variablesText = variablesCount === 1 ? "1 variabel" : `${variablesCount} variabel`;
  return `Apakah Anda yakin ingin membuat formula "${formulaName}" dengan status "${statusText}" dan ${variablesText}?`;
};

/**
 * Check if formula name is valid
 * @param {string} name - Formula name
 * @returns {Object} - Validation result
 */
export const validateFormulaName = (name) => {
  const errors = {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = "Nama formula wajib diisi";
  } else if (name.trim().length < 2) {
    errors.name = "Nama formula minimal 2 karakter";
  } else if (name.trim().length > 100) {
    errors.name = "Nama formula maksimal 100 karakter";
  } else if (/[<>\"'&]/.test(name)) {
    errors.name = "Nama formula tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if formula name already exists (mock implementation)
 * @param {string} name - Formula name
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {boolean} - Whether name exists
 */
export const checkFormulaNameExists = (name, existingFormulas = []) => {
  if (!Array.isArray(existingFormulas) || !name) return false;
  
  return existingFormulas.some(formula => 
    formula.name && formula.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get duplicate name error message
 * @param {string} name - Formula name
 * @returns {string} - Error message
 */
export const getDuplicateNameErrorMessage = (name) => {
  return `Nama formula "${name}" sudah digunakan. Silakan gunakan nama yang berbeda.`;
};

/**
 * Generate suggested formula names
 * @param {string} baseName - Base name
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {Array} - Array of suggested names
 */
export const generateSuggestedFormulaNames = (baseName, existingFormulas = []) => {
  if (!baseName) return [];
  
  const suggestions = [];
  const base = baseName.trim();
  
  // Add number suffixes
  for (let i = 1; i <= 5; i++) {
    const suggestion = `${base} ${i}`;
    if (!checkFormulaNameExists(suggestion, existingFormulas)) {
      suggestions.push(suggestion);
    }
  }
  
  // Add "New" prefix
  const newSuggestion = `New ${base}`;
  if (!checkFormulaNameExists(newSuggestion, existingFormulas)) {
    suggestions.push(newSuggestion);
  }
  
  return suggestions.slice(0, 3); // Return max 3 suggestions
};

/**
 * Sanitize formula name
 * @param {string} name - Formula name
 * @returns {string} - Sanitized name
 */
export const sanitizeFormulaName = (name) => {
  if (!name || typeof name !== 'string') return '';
  
  return name
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, 100); // Limit to 100 characters
};

/**
 * Validate variable data
 * @param {Object} variable - Variable data
 * @param {number} index - Variable index
 * @returns {Object} - Validation result
 */
export const validateVariableData = (variable, index = 0) => {
  const errors = {};

  const varName = variable.variableName || variable.name;
  if (!varName || typeof varName !== 'string' || varName.trim() === '') {
    errors[`variables.${index}.name`] = "Nama variabel wajib diisi";
  } else if (varName.trim().length < 1) {
    errors[`variables.${index}.name`] = "Nama variabel tidak boleh kosong";
  } else if (varName.trim().length > 50) {
    errors[`variables.${index}.name`] = "Nama variabel maksimal 50 karakter";
  }

  // isFromShipper validation removed - not required in payload

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate variables array
 * @param {Array} variables - Variables array
 * @returns {Object} - Validation result
 */
export const validateVariablesArray = (variables) => {
  const errors = {};

  if (!Array.isArray(variables)) {
    errors.variables = "Variables harus berupa array";
    return { isValid: false, errors };
  }

  if (variables.length === 0) {
    errors.variables = "Minimal harus ada 1 variabel";
    return { isValid: false, errors };
  }

  // Validate each variable
  variables.forEach((variable, index) => {
    const varValidation = validateVariableData(variable, index);
    if (!varValidation.isValid) {
      Object.assign(errors, varValidation.errors);
    }
  });

  // Check for duplicate variable names
  const variableNames = variables.map(v => (v.variableName || v.name || '').trim()).filter(name => name);
  const uniqueNames = new Set(variableNames);
  if (variableNames.length !== uniqueNames.size) {
    errors.variables = "Nama variabel tidak boleh duplikat";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Get form validation rules
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRules = () => {
  return {
    name: {
      required: "Nama formula wajib diisi",
      minLength: {
        value: 2,
        message: "Nama formula minimal 2 karakter"
      },
      maxLength: {
        value: 100,
        message: "Nama formula maksimal 100 karakter"
      },
      pattern: {
        value: /^[^<>\"'&]*$/,
        message: "Nama formula tidak boleh mengandung karakter khusus"
      }
    },
    isActive: {
      required: "Status wajib dipilih"
    },
    variables: {
      required: "Minimal harus ada 1 variabel",
      validate: (value) => {
        if (!Array.isArray(value) || value.length === 0) {
          return "Minimal harus ada 1 variabel";
        }
        return true;
      }
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
    isActive: true,
    variables: []
  };
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data
 * @returns {Object} - API format data
 */
export const transformFormToAPI = (formData) => {
  return {
    name: sanitizeFormulaName(formData.name),
    isActive: Boolean(formData.isActive),
    variables: (formData.variables || []).map(variable => ({
      variableName: (variable.variableName || variable.name || '').trim(),
      // isFromShipper is not included in the payload
    }))
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
    isActive: Boolean(apiData.isActive),
    variables: (apiData.variables || []).map(variable => ({
      variableName: variable.variableName || variable.name || "",
      // isFromShipper is not included in the payload
    }))
  };
};

/**
 * Get source display text
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - Display text
 */
export const getSourceDisplayText = (isFromShipper) => {
  return isFromShipper ? "Shipper" : "Sistem";
};

/**
 * Get source color class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class
 */
export const getSourceColorClass = (isFromShipper) => {
  return isFromShipper ? "text-blue-600" : "text-green-600";
};

/**
 * Get source badge class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class for badge
 */
export const getSourceBadgeClass = (isFromShipper) => {
  return isFromShipper 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};
