import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for successful min rate creation
export const mockAPIResult = {
  Message: {
    Code: 201,
    Text: "Created"
  },
  Data: {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
    truckName: "Colt Diesel Engkel",
    minDistance: 50,
    validFrom: "2025-09-25T08:00:00.000Z",
    createdAt: "2025-09-22T10:45:30.648Z",
    createdBy: "Backend BO GM",
    updatedAt: "2025-09-22T10:45:30.648Z",
    updatedBy: null
  },
  Type: "/v1/bo/pricing/setting/min-rates"
};

/**
 * Fetcher function to create min rate
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Request body data
 * @returns {Promise} - Axios response promise
 */
export const postCreateMinRate = async (url, data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post(url, data);
};

/**
 * Transform API response data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data
 */
export const transformPostCreateMinRateResponse = (apiData) => {
  if (!apiData) return null;

  const createdDate = new Date(apiData.createdAt);
  const validFromDate = new Date(apiData.validFrom);
  
  return {
    id: apiData.id,
    truckTypeId: apiData.truckTypeId,
    truckName: apiData.truckName,
    minDistance: apiData.minDistance,
    validFrom: apiData.validFrom,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    updatedAt: apiData.updatedAt,
    updatedBy: apiData.updatedBy,
    // Formatted display values
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    validFromFormatted: `${validFromDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`,
    minDistanceFormatted: `${apiData.minDistance} km`,
    // Status based on validFrom date
    isActive: new Date(apiData.validFrom) <= new Date(),
    statusText: new Date(apiData.validFrom) <= new Date() ? "Aktif" : "Belum Aktif",
    statusColor: new Date(apiData.validFrom) <= new Date() ? "text-green-600" : "text-orange-600",
    statusBadge: new Date(apiData.validFrom) <= new Date() ? 
      "bg-green-100 text-green-800 border-green-200" : 
      "bg-orange-100 text-orange-800 border-orange-200",
  };
};

/**
 * Transform form data for API request
 * @param {Object} formData - Form data
 * @param {string} formData.truckTypeId - Truck type ID
 * @param {string} formData.truckName - Truck name
 * @param {number} formData.minDistance - Minimum distance
 * @param {string} formData.validFrom - Valid from date
 * @returns {Object} - Transformed request data
 */
export const transformPostCreateMinRateRequest = (formData) => {
  if (!formData) {
    throw new Error("Form data is required");
  }

  const { truckTypeId, truckName, minDistance, validFrom } = formData;

  if (!truckTypeId || typeof truckTypeId !== 'string' || truckTypeId.trim() === '') {
    throw new Error("Truck Type ID is required and must be a non-empty string");
  }

  if (!truckName || typeof truckName !== 'string' || truckName.trim() === '') {
    throw new Error("Truck Name is required and must be a non-empty string");
  }

  if (!minDistance || typeof minDistance !== 'number' || minDistance <= 0) {
    throw new Error("Minimum Distance is required and must be a positive number");
  }

  if (!validFrom) {
    throw new Error("Valid From date is required");
  }

  return {
    truckTypeId: truckTypeId.trim(),
    truckName: truckName.trim(),
    minDistance: Number(minDistance),
    validFrom: validFrom instanceof Date ? validFrom.toISOString() : validFrom,
  };
};

/**
 * Validate min rate creation data
 * @param {Object} data - Data to validate
 * @param {string} data.truckTypeId - Truck type ID
 * @param {string} data.truckName - Truck name
 * @param {number} data.minDistance - Minimum distance
 * @param {string} data.validFrom - Valid from date
 * @returns {Object} - Validation result
 */
export const validateMinRateCreationData = (data) => {
  const errors = {};

  if (!data.truckTypeId || typeof data.truckTypeId !== 'string' || data.truckTypeId.trim() === '') {
    errors.truckTypeId = "Truck Type ID wajib diisi";
  }

  if (!data.truckName || typeof data.truckName !== 'string' || data.truckName.trim() === '') {
    errors.truckName = "Nama Truck wajib diisi";
  } else if (data.truckName.trim().length < 2) {
    errors.truckName = "Nama Truck minimal 2 karakter";
  } else if (data.truckName.trim().length > 100) {
    errors.truckName = "Nama Truck maksimal 100 karakter";
  }

  if (!data.minDistance || typeof data.minDistance !== 'number' || data.minDistance <= 0) {
    errors.minDistance = "Jarak Minimum wajib diisi dan harus lebih dari 0";
  } else if (data.minDistance < 1) {
    errors.minDistance = "Jarak Minimum minimal 1 km";
  } else if (data.minDistance > 10000) {
    errors.minDistance = "Jarak Minimum maksimal 10,000 km";
  }

  if (!data.validFrom) {
    errors.validFrom = "Tanggal Berlaku wajib diisi";
  } else {
    const validFromDate = new Date(data.validFrom);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(validFromDate.getTime())) {
      errors.validFrom = "Format tanggal tidak valid";
    } else if (validFromDate < today) {
      errors.validFrom = "Tanggal Berlaku tidak boleh di masa lalu";
    }
  }

  // Check for special characters in truck name
  if (data.truckName && /[<>\"'&]/.test(data.truckName)) {
    errors.truckName = "Nama Truck tidak boleh mengandung karakter khusus";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Create min rate with validation
 * @param {Object} data - Request data
 * @param {string} data.truckTypeId - Truck type ID
 * @param {string} data.truckName - Truck name
 * @param {number} data.minDistance - Minimum distance
 * @param {string} data.validFrom - Valid from date
 * @returns {Promise} - API response promise
 */
export const postCreateMinRateWithValidation = async (data) => {
  // Validate data
  const validation = validateMinRateCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPostCreateMinRateRequest(data);

  // Make API call
  const response = await postCreateMinRate("/v1/bo/pricing/setting/min-rates", requestData);
  
  // Transform response
  return transformPostCreateMinRateResponse(response.data.Data);
};

/**
 * Create min rate with mock data for development
 * @param {Object} data - Request data
 * @param {string} data.truckTypeId - Truck type ID
 * @param {string} data.truckName - Truck name
 * @param {number} data.minDistance - Minimum distance
 * @param {string} data.validFrom - Valid from date
 * @returns {Promise} - Mock response promise
 */
export const postCreateMinRateMock = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate data
  const validation = validateMinRateCreationData(data);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
  }

  // Transform request data
  const requestData = transformPostCreateMinRateRequest(data);

  // Generate mock ID
  const mockId = `minrate-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  // Return mock response
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: mockId,
      truckTypeId: requestData.truckTypeId,
      truckName: requestData.truckName,
      minDistance: requestData.minDistance,
      validFrom: requestData.validFrom,
      createdAt: new Date().toISOString(),
    }
  };
};

/**
 * Get success message for min rate creation
 * @param {string} truckName - Truck name
 * @param {number} minDistance - Minimum distance
 * @param {string} validFrom - Valid from date
 * @returns {string} - Success message
 */
export const getMinRateCreationSuccessMessage = (truckName, minDistance, validFrom) => {
  const validFromFormatted = new Date(validFrom).toLocaleDateString("id-ID");
  return `Tarif minimal untuk ${truckName} berhasil dibuat dengan jarak ${minDistance} km, berlaku mulai ${validFromFormatted}`;
};

/**
 * Get error message for min rate creation
 * @param {string} truckName - Truck name
 * @param {Error} error - Error object
 * @returns {string} - Error message
 */
export const getMinRateCreationErrorMessage = (truckName, error) => {
  return `Gagal membuat tarif minimal untuk ${truckName}: ${error.message}`;
};

/**
 * Get confirmation message for min rate creation
 * @param {string} truckName - Truck name
 * @param {number} minDistance - Minimum distance
 * @param {string} validFrom - Valid from date
 * @returns {string} - Confirmation message
 */
export const getMinRateCreationConfirmationMessage = (truckName, minDistance, validFrom) => {
  const validFromFormatted = new Date(validFrom).toLocaleDateString("id-ID");
  return `Apakah Anda yakin ingin membuat tarif minimal untuk ${truckName} dengan jarak ${minDistance} km, berlaku mulai ${validFromFormatted}?`;
};

/**
 * Check if min rate already exists for truck type
 * @param {string} truckTypeId - Truck type ID
 * @param {Array} existingMinRates - Array of existing min rates
 * @returns {boolean} - Whether min rate exists
 */
export const checkMinRateExistsForTruckType = (truckTypeId, existingMinRates = []) => {
  if (!Array.isArray(existingMinRates) || !truckTypeId) return false;
  
  return existingMinRates.some(minRate => 
    minRate.truckTypeId === truckTypeId
  );
};

/**
 * Get duplicate truck type error message
 * @param {string} truckName - Truck name
 * @returns {string} - Error message
 */
export const getDuplicateTruckTypeErrorMessage = (truckName) => {
  return `Tarif minimal untuk ${truckName} sudah ada. Silakan gunakan jenis truck yang berbeda.`;
};

/**
 * Sanitize truck name
 * @param {string} truckName - Truck name
 * @returns {string} - Sanitized name
 */
export const sanitizeTruckName = (truckName) => {
  if (!truckName || typeof truckName !== 'string') return '';
  
  return truckName
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, 100); // Limit to 100 characters
};

/**
 * Get form validation rules for creation
 * @returns {Object} - Validation rules object
 */
export const getFormValidationRulesForCreation = () => {
  return {
    truckTypeId: {
      required: "Truck Type ID wajib diisi"
    },
    truckName: {
      required: "Nama Truck wajib diisi",
      minLength: {
        value: 2,
        message: "Nama Truck minimal 2 karakter"
      },
      maxLength: {
        value: 100,
        message: "Nama Truck maksimal 100 karakter"
      },
      pattern: {
        value: /^[^<>\"'&]*$/,
        message: "Nama Truck tidak boleh mengandung karakter khusus"
      }
    },
    minDistance: {
      required: "Jarak Minimum wajib diisi",
      min: {
        value: 1,
        message: "Jarak Minimum minimal 1 km"
      },
      max: {
        value: 10000,
        message: "Jarak Minimum maksimal 10,000 km"
      }
    },
    validFrom: {
      required: "Tanggal Berlaku wajib diisi",
      validate: (value) => {
        if (!value) return "Tanggal Berlaku wajib diisi";
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(date.getTime())) return "Format tanggal tidak valid";
        if (date < today) return "Tanggal Berlaku tidak boleh di masa lalu";
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
    truckTypeId: formData.truckTypeId?.trim() || "",
    truckName: sanitizeTruckName(formData.truckName),
    minDistance: Number(formData.minDistance) || 0,
    validFrom: formData.validFrom instanceof Date ? 
      formData.validFrom.toISOString() : 
      formData.validFrom || "",
  };
};

/**
 * Transform API data to form format
 * @param {Object} apiData - API data
 * @returns {Object} - Form format data
 */
export const transformAPIToForm = (apiData) => {
  return {
    truckTypeId: apiData.truckTypeId || "",
    truckName: apiData.truckName || "",
    minDistance: apiData.minDistance || 0,
    validFrom: apiData.validFrom ? new Date(apiData.validFrom) : null,
  };
};

/**
 * Validate min rate creation with existing data
 * @param {Object} data - Creation data
 * @param {Array} existingMinRates - Array of existing min rates
 * @returns {Object} - Validation result
 */
export const validateMinRateCreationWithExisting = (data, existingMinRates = []) => {
  const validation = validateMinRateCreationData(data);
  
  if (!validation.isValid) {
    return validation;
  }

  // Check for duplicate truck type
  if (checkMinRateExistsForTruckType(data.truckTypeId, existingMinRates)) {
    return {
      isValid: false,
      errors: {
        truckTypeId: getDuplicateTruckTypeErrorMessage(data.truckName)
      }
    };
  }

  return validation;
};

/**
 * Get truck type suggestions for duplicate
 * @param {string} truckTypeId - Current truck type ID
 * @param {Array} availableTruckTypes - Array of available truck types
 * @returns {Array} - Suggested truck types
 */
export const getTruckTypeSuggestions = (truckTypeId, availableTruckTypes = []) => {
  if (!Array.isArray(availableTruckTypes) || !truckTypeId) return [];
  
  return availableTruckTypes
    .filter(truckType => truckType.id !== truckTypeId)
    .slice(0, 3) // Return top 3 suggestions
    .map(truckType => ({
      id: truckType.id,
      name: truckType.description || truckType.name,
      description: truckType.description || truckType.name
    }));
};

/**
 * Get creation summary
 * @param {Object} data - Creation data
 * @returns {Object} - Summary object
 */
export const getCreationSummary = (data) => {
  if (!data) return {};

  return {
    truckName: data.truckName || "",
    minDistance: data.minDistance || 0,
    validFrom: data.validFrom ? new Date(data.validFrom).toLocaleDateString("id-ID") : "",
    validFromFormatted: data.validFrom ? 
      new Date(data.validFrom).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) : "",
    minDistanceFormatted: `${data.minDistance || 0} km`,
  };
};

/**
 * Get creation preview
 * @param {Object} data - Creation data
 * @returns {string} - Preview text
 */
export const getCreationPreview = (data) => {
  const summary = getCreationSummary(data);
  return `Truck: ${summary.truckName}\nJarak Minimum: ${summary.minDistanceFormatted}\nBerlaku Mulai: ${summary.validFromFormatted}`;
};

/**
 * Check if data has changes from default
 * @param {Object} data - Current data
 * @returns {boolean} - Whether data has changes
 */
export const hasCreationDataChanges = (data) => {
  if (!data) return false;
  
  return !!(
    data.truckTypeId ||
    data.truckName ||
    data.minDistance ||
    data.validFrom
  );
};

/**
 * Get creation data statistics
 * @param {Object} data - Creation data
 * @returns {Object} - Statistics object
 */
export const getCreationDataStatistics = (data) => {
  if (!data) return {};

  return {
    hasTruckTypeId: !!data.truckTypeId,
    hasTruckName: !!data.truckName,
    hasMinDistance: !!data.minDistance,
    hasValidFrom: !!data.validFrom,
    isComplete: !!(data.truckTypeId && data.truckName && data.minDistance && data.validFrom),
    truckNameLength: data.truckName ? data.truckName.length : 0,
    minDistanceValue: data.minDistance || 0,
  };
};
