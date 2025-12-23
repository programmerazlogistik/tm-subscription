import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful formula update
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    id: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
    name: "Updated Formula Name",
    isActive: true,
    updatedAt: "2025-09-22T10:45:30.648Z",
    updatedBy: "Backend BO GM"
    // Variables are not included in update response
  },
  Type: "/v1/bo/pricing/master/formula/39100e8e-f4c9-4dd2-a025-85df7a4a3f89"
};

/**
 * Fetcher function to update formula
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const putUpdateFormula = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.put(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPutUpdateFormulaResponse = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    updatedAt: apiData.updatedAt,
    updatedBy: apiData.updatedBy,
    variables: apiData.variables || [],
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
    variablesCount: apiData.variables ? apiData.variables.length : 0,
    variablesList: apiData.variables ? apiData.variables.map(v => v.variableName).join(", ") : "",
  };
};

/**
 * Transform form data for API request
 * @param {Object} formData - Form data
 * @param {string} formData.name - Formula name
 * @param {boolean} formData.isActive - Active status
 * @returns {Object} - Transformed request data
 */
export const transformPutUpdateFormulaRequest = (formData) => {
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
    // Variables are not included in update payload
  };
};

/**
 * Validate formula update data
 * @param {Object} data - Data to validate
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @returns {Object} - Validation result
 */
export const validateFormulaUpdateData = (data) => {
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

  // Variables validation removed - only name and isActive are required for update

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
 * Update formula with validation
 * @param {string} formulaId - Formula ID
 * @param {Object} data - Request data
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @param {Array} data.variables - Variables array
 * @returns {Promise} - API response promise
 */
export const putUpdateFormulaWithValidation = async (formulaId, data) => {
  // Validate data
  const validation = validateFormulaUpdateData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPutUpdateFormulaRequest(data);

  // Make API call
  const response = await putUpdateFormula(`/v1/bo/pricing/master/formula/${formulaId}`, requestData);
  
  // Transform response
  return transformPutUpdateFormulaResponse(response.data.Data);
};

/**
 * Update formula with mock data for development
 * @param {string} formulaId - Formula ID
 * @param {Object} data - Request data
 * @param {string} data.name - Formula name
 * @param {boolean} data.isActive - Active status
 * @returns {Promise} - Mock response promise
 */
export const putUpdateFormulaMock = async (formulaId, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateFormulaUpdateData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: formulaId,
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
 * Get success message for formula update
 * @param {string} formulaName - Formula name
 * @param {boolean} isActive - Active status
 * @param {number} variablesCount - Number of variables
 * @returns {string} - Success message
 */
export const getFormulaUpdateSuccessMessage = (formulaName, isActive, variablesCount = 0) => {
  const statusText = getStatusDisplayText(isActive);
  const variablesText = variablesCount === 1 ? "1 variabel" : `${variablesCount} variabel`;
  return `Formula "${formulaName}" berhasil diperbarui dengan status "${statusText}" dan ${variablesText}`;
};

/**
 * Get error message for formula update
 * @param {string} formulaName - Formula name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getFormulaUpdateErrorMessage = (formulaName, error) => {
  return `Gagal memperbarui formula "${formulaName}": ${error.message}`;
};

/**
 * Get confirmation message for formula update
 * @param {string} formulaName - Formula name
 * @param {boolean} isActive - Active status
 * @param {number} variablesCount - Number of variables
 * @returns {string} - Confirmation message
 */
export const getFormulaUpdateConfirmationMessage = (formulaName, isActive, variablesCount = 0) => {
  const statusText = getStatusDisplayText(isActive);
  const variablesText = variablesCount === 1 ? "1 variabel" : `${variablesCount} variabel`;
  return `Apakah Anda yakin ingin memperbarui formula "${formulaName}" dengan status "${statusText}" dan ${variablesText}?`;
};

/**
 * Check if formula data has changes
 * @param {Object} originalData - Original data
 * @param {Object} newData - New data
 * @returns {Object} - Change detection result
 */
export const detectFormulaChanges = (originalData, newData) => {
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

  // Check variables changes
  const originalVars = originalData.variables || [];
  const newVars = newData.variables || [];
  
  if (originalVars.length !== newVars.length) {
    changes.variables = {
      from: originalVars.length,
      to: newVars.length,
      changed: true,
      type: "count"
    };
    hasChanges = true;
  } else {
    // Check individual variable changes
    const varChanges = [];
    newVars.forEach((newVar, index) => {
      const originalVar = originalVars[index];
      if (originalVar) {
        const varChange = {
          index,
          changes: {}
        };
        
        if (originalVar.variableName !== newVar.variableName) {
          varChange.changes.name = {
            from: originalVar.variableName,
            to: newVar.variableName
          };
        }
        
        if (originalVar.isFromShipper !== newVar.isFromShipper) {
          varChange.changes.source = {
            from: originalVar.isFromShipper,
            to: newVar.isFromShipper
          };
        }
        
        if (Object.keys(varChange.changes).length > 0) {
          varChanges.push(varChange);
        }
      }
    });
    
    if (varChanges.length > 0) {
      changes.variables = {
        changed: true,
        type: "content",
        details: varChanges
      };
      hasChanges = true;
    }
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

  if (changes.variables) {
    if (changes.variables.type === "count") {
      changeList.push(`Variabel: ${changes.variables.from} → ${changes.variables.to}`);
    } else if (changes.variables.type === "content") {
      changeList.push(`Variabel: ${changes.variables.details.length} perubahan`);
    }
  }

  return changeList.join(", ");
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
 * Check if formula name already exists (excluding current formula)
 * @param {string} name - Formula name
 * @param {string} currentFormulaId - Current formula ID
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {boolean} - Whether name exists
 */
export const checkFormulaNameExistsForUpdate = (name, currentFormulaId, existingFormulas = []) => {
  if (!Array.isArray(existingFormulas) || !name || !currentFormulaId) return false;
  
  return existingFormulas.some(formula => 
    formula.id !== currentFormulaId && 
    formula.name && 
    formula.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Get duplicate name error message for update
 * @param {string} name - Formula name
 * @returns {string} - Error message
 */
export const getDuplicateNameErrorMessageForUpdate = (name) => {
  return `Nama formula "${name}" sudah digunakan oleh formula lain. Silakan gunakan nama yang berbeda.`;
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
 * Get form validation rules for update
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRulesForUpdate = () => {
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
 * Transform form data to API format
 * @param {Object} formData - Form data
 * @returns {Object} - API format data
 */
export const transformFormToAPI = (formData) => {
  return {
    name: sanitizeFormulaName(formData.name),
    isActive: Boolean(formData.isActive),
    variables: (formData.variables || []).map(variable => ({
      id: variable.id, // Include ID for existing variables
      variableName: (variable.variableName || variable.name || '').trim(),
      isFromShipper: Boolean(variable.isFromShipper),
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
      id: variable.id,
      variableName: variable.variableName || variable.name || "",
      isFromShipper: Boolean(variable.isFromShipper),
    }))
  };
};

/**
 * Get update confirmation with changes
 * @param {string} formulaName - Formula name
 * @param {Object} changes - Changes object
 * @returns {string} - Confirmation message with changes
 */
export const getUpdateConfirmationWithChanges = (formulaName, changes) => {
  const changeSummary = getChangeSummaryText(changes);
  return `Apakah Anda yakin ingin memperbarui formula "${formulaName}"?\n\nPerubahan: ${changeSummary}`;
};

/**
 * Get update success message with changes
 * @param {string} formulaName - Formula name
 * @param {Object} changes - Changes object
 * @returns {string} - Success message with changes
 */
export const getUpdateSuccessWithChanges = (formulaName, changes) => {
  const changeSummary = getChangeSummaryText(changes);
  return `Formula "${formulaName}" berhasil diperbarui.\n\nPerubahan: ${changeSummary}`;
};

/**
 * Validate update data with existing formulas
 * @param {Object} data - Update data
 * @param {string} currentFormulaId - Current formula ID
 * @param {Array} existingFormulas - Array of existing formulas
 * @returns {Object} - Validation result
 */
export const validateFormulaUpdateWithExisting = (data, currentFormulaId, existingFormulas = []) => {
  const validation = validateFormulaUpdateData(data);
  
  if (!validation.isValid) {
    return validation;
  }

  // Check for duplicate name
  if (checkFormulaNameExistsForUpdate(data.name, currentFormulaId, existingFormulas)) {
    return {
      isValid: false,
      errors: {
        name: getDuplicateNameErrorMessageForUpdate(data.name)
      }
    };
  }

  return validation;
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
