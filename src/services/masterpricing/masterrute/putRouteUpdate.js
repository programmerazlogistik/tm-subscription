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
    alias: "Sumatra - SumatrA Updated",
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
    isActive: true,
    updatedAt: "2025-09-22T10:45:30.123Z",
    updatedBy: "Backend BO GM",
    specialRoutes: [
      {
        id: "23402548-006f-4e20-97c2-fe8871c9e456",
        originCityId: 1103,
        originCityName: "KAB. ACEH TIMUR",
        destinationCityId: 1105,
        destinationCityName: "KAB. ACEH BARAT",
        isActive: true,
        updatedAt: "2025-09-22T10:45:30.135Z"
      },
      {
        id: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
        originCityId: 1106,
        originCityName: "KAB. ACEH BESAR",
        destinationCityId: 1110,
        destinationCityName: "KAB. ACEH SINGKIL",
        isActive: true,
        updatedAt: "2025-09-22T10:45:30.140Z"
      }
    ]
  },
  Type: "/v1/bo/pricing/master/route/731df77a-a9df-43df-9564-fba370e1d38c"
};

/**
 * Update existing route master
 * @param {string} routeId - Route ID to update
 * @param {Object} routeData - Route data to update
 * @param {string} routeData.alias - Route alias
 * @param {Array} routeData.originProvinces - Array of origin province IDs
 * @param {Array} routeData.destinationProvinces - Array of destination province IDs
 * @param {boolean} routeData.isActive - Route status
 * @param {Array} routeData.specialRoutes - Array of special routes (optional)
 * @returns {Promise} - Axios response promise
 */
export const putRouteUpdate = async (routeId, routeData) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }

  if (!routeData) {
    throw new Error("routeData parameter is required");
  }

  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = `/v1/bo/pricing/master/route/${routeId}`;
  
  return fetcher.put(url, routeData);
};

/**
 * Update existing route master with mock data for development
 * @param {string} routeId - Route ID to update
 * @param {Object} routeData - Route data to update
 * @returns {Promise} - Mock data promise
 */
export const putRouteUpdateMock = async (routeId, routeData) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }

  if (!routeData) {
    throw new Error("routeData parameter is required");
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  const now = new Date().toISOString();

  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: routeId,
      alias: routeData.alias || "Updated Route",
      originProvinces: routeData.originProvinces || [],
      destinationProvinces: routeData.destinationProvinces || [],
      isActive: routeData.isActive !== undefined ? routeData.isActive : true,
      updatedAt: now,
      updatedBy: "Backend BO GM",
      specialRoutes: routeData.specialRoutes?.map(route => ({
        ...route,
        updatedAt: now
      })) || []
    },
    Type: `/v1/bo/pricing/master/route/${routeId}`
  };
};

/**
 * Transform form data to API format for update
 * @param {Object} formData - Form data from component
 * @returns {Object} - API-ready data format
 */
export const transformFormDataToUpdateAPI = (formData) => {
  if (!formData) return {};

  return {
    alias: formData.alias || "",
    originProvinces: formData.originProvinces?.map(province => 
      typeof province === "object" ? { id: province.id, name: province.name } : { id: province, name: "" }
    ) || [],
    destinationProvinces: formData.destinationProvinces?.map(province => 
      typeof province === "object" ? { id: province.id, name: province.name } : { id: province, name: "" }
    ) || [],
    isActive: formData.isActive !== undefined ? formData.isActive : true,
    specialRoutes: formData.specialRoutes?.map(route => ({
      id: route.id, // Include ID for existing routes
      originCityId: route.originCityId,
      destinationCityId: route.destinationCityId,
      isActive: route.isActive !== undefined ? route.isActive : true
    })) || []
  };
};

/**
 * Transform API response data to form format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Form-ready data format
 */
export const transformUpdateResponseToForm = (apiData) => {
  if (!apiData) return {};

  return {
    id: apiData.id,
    alias: apiData.alias || "",
    originProvinces: apiData.originProvinces?.map(province => ({
      value: province.id,
      label: province.name,
      id: province.id,
      name: province.name
    })) || [],
    destinationProvinces: apiData.destinationProvinces?.map(province => ({
      value: province.id,
      label: province.name,
      id: province.id,
      name: province.name
    })) || [],
    isActive: apiData.isActive || false,
    specialRoutes: apiData.specialRoutes?.map(route => ({
      id: route.id,
      originCityId: route.originCityId,
      originCityName: route.originCityName,
      destinationCityId: route.destinationCityId,
      destinationCityName: route.destinationCityName,
      isActive: route.isActive || false,
      updatedAt: route.updatedAt
    })) || [],
    updatedAt: apiData.updatedAt,
    updatedBy: apiData.updatedBy
  };
};

/**
 * Update route master with error handling
 * @param {string} routeId - Route ID to update
 * @param {Object} routeData - Route data to update
 * @param {Object} options - Additional options
 * @param {boolean} options.useMock - Whether to use mock data
 * @returns {Promise} - Promise with success/error result
 */
export const updateRouteMaster = async (routeId, routeData, options = {}) => {
  const { useMock = false } = options;

  try {
    // Transform form data to API format
    const apiData = transformFormDataToUpdateAPI(routeData);
    
    let response;
    if (useMock) {
      response = await putRouteUpdateMock(routeId, apiData);
    } else {
      response = await putRouteUpdate(routeId, apiData);
    }

    return {
      success: true,
      data: response.data?.Data || response.Data,
      message: response.data?.Message?.Text || response.Message?.Text || "Route updated successfully",
      transformedData: transformUpdateResponseToForm(response.data?.Data || response.Data)
    };
  } catch (error) {
    console.error("Error updating route:", error);
    
    return {
      success: false,
      error: error.message || "Failed to update route",
      details: error.response?.data || error
    };
  }
};

/**
 * Validate route update data
 * @param {string} routeId - Route ID
 * @param {Object} routeData - Route data to validate
 * @returns {Object} - Validation result
 */
export const validateRouteUpdateData = (routeId, routeData) => {
  const errors = [];

  if (!routeId || typeof routeId !== "string") {
    errors.push("routeId must be a non-empty string");
  }

  if (!routeData || typeof routeData !== "object") {
    errors.push("routeData must be an object");
    return { isValid: false, errors };
  }

  // Validate alias
  if (!routeData.alias || typeof routeData.alias !== "string" || routeData.alias.trim() === "") {
    errors.push("alias is required and must be a non-empty string");
  }

  // Validate origin provinces
  if (!Array.isArray(routeData.originProvinces) || routeData.originProvinces.length === 0) {
    errors.push("originProvinces is required and must be a non-empty array");
  }

  // Validate destination provinces
  if (!Array.isArray(routeData.destinationProvinces) || routeData.destinationProvinces.length === 0) {
    errors.push("destinationProvinces is required and must be a non-empty array");
  }

  // Validate isActive (optional)
  if (routeData.isActive !== undefined && typeof routeData.isActive !== "boolean") {
    errors.push("isActive must be a boolean if provided");
  }

  // Validate special routes (optional)
  if (routeData.specialRoutes && !Array.isArray(routeData.specialRoutes)) {
    errors.push("specialRoutes must be an array if provided");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Update route with form validation
 * @param {string} routeId - Route ID to update
 * @param {Object} formData - Form data
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise with validation and update result
 */
export const updateRouteWithValidation = async (routeId, formData, options = {}) => {
  // Validate data first
  const validation = validateRouteUpdateData(routeId, formData);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: "Validation failed",
      validationErrors: validation.errors,
      details: "Please fix the validation errors before updating the route"
    };
  }

  // Update route if validation passes
  return await updateRouteMaster(routeId, formData, options);
};

/**
 * Compare route data to detect changes
 * @param {Object} originalData - Original route data
 * @param {Object} newData - New route data
 * @returns {Object} - Changes detected
 */
export const detectRouteChanges = (originalData, newData) => {
  if (!originalData || !newData) {
    return { hasChanges: false, changes: [] };
  }

  const changes = [];

  // Check alias
  if (originalData.alias !== newData.alias) {
    changes.push({
      field: "alias",
      oldValue: originalData.alias,
      newValue: newData.alias
    });
  }

  // Check isActive
  if (originalData.isActive !== newData.isActive) {
    changes.push({
      field: "isActive",
      oldValue: originalData.isActive,
      newValue: newData.isActive
    });
  }

  // Check origin provinces
  const originalOriginIds = originalData.originProvinces?.map(p => 
    typeof p === "object" ? p.id : p
  ).sort() || [];
  const newOriginIds = newData.originProvinces?.map(p => 
    typeof p === "object" ? p.id : p
  ).sort() || [];
  
  if (JSON.stringify(originalOriginIds) !== JSON.stringify(newOriginIds)) {
    changes.push({
      field: "originProvinces",
      oldValue: originalOriginIds,
      newValue: newOriginIds
    });
  }

  // Check destination provinces
  const originalDestIds = originalData.destinationProvinces?.map(p => 
    typeof p === "object" ? p.id : p
  ).sort() || [];
  const newDestIds = newData.destinationProvinces?.map(p => 
    typeof p === "object" ? p.id : p
  ).sort() || [];
  
  if (JSON.stringify(originalDestIds) !== JSON.stringify(newDestIds)) {
    changes.push({
      field: "destinationProvinces",
      oldValue: originalDestIds,
      newValue: newDestIds
    });
  }

  return {
    hasChanges: changes.length > 0,
    changes
  };
};
