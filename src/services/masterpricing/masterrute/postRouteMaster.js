import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 201,
    Text: "Created"
  },
  Data: {
    id: "abe5475a-9ca1-4f23-9b0f-f6c575794ecf",
    alias: "Sumatra - Sumatra 2",
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
    createdAt: "2025-09-22T10:37:02.602Z",
    createdBy: "Backend BO GM",
    specialRoutes: [
      {
        id: "0a4b6d85-2026-4852-99ba-075df566130d",
        originCityId: 1103,
        originCityName: "KAB. ACEH TIMUR",
        destinationCityId: 1105,
        destinationCityName: "KAB. ACEH BARAT",
        isActive: true,
        createdAt: "2025-09-22T10:37:02.615Z"
      }
    ]
  },
  Type: "/v1/bo/pricing/master/route"
};

/**
 * Create new route master
 * @param {Object} routeData - Route data to create
 * @param {string} routeData.alias - Route alias
 * @param {Array} routeData.originProvinces - Array of origin province IDs
 * @param {Array} routeData.destinationProvinces - Array of destination province IDs
 * @param {boolean} routeData.isActive - Route status
 * @param {Array} routeData.specialRoutes - Array of special routes (optional)
 * @returns {Promise} - Axios response promise
 */
export const postRouteMaster = async (routeData) => {
  if (!routeData) {
    throw new Error("routeData parameter is required");
  }

  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = "/v1/bo/pricing/master/route";
  
  return fetcher.post(url, routeData);
};

/**
 * Create new route master with mock data for development
 * @param {Object} routeData - Route data to create
 * @returns {Promise} - Mock data promise
 */
export const postRouteMasterMock = async (routeData) => {
  if (!routeData) {
    throw new Error("routeData parameter is required");
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generate random ID
  const generateId = () => {
    const part1 = Math.random().toString(36).substr(2, 9);
    const part2 = Math.random().toString(36).substr(2, 4);
    const part3 = Math.random().toString(36).substr(2, 4);
    const part4 = Math.random().toString(36).substr(2, 4);
    const part5 = Math.random().toString(36).substr(2, 12);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  };

  const now = new Date().toISOString();

  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: generateId(),
      alias: routeData.alias || "New Route",
      originProvinces: routeData.originProvinces || [],
      destinationProvinces: routeData.destinationProvinces || [],
      isActive: routeData.isActive !== undefined ? routeData.isActive : true,
      createdAt: now,
      createdBy: "Backend BO GM",
      specialRoutes: routeData.specialRoutes || []
    }
  };
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data from component
 * @returns {Object} - API-ready data format
 */
export const transformFormDataToAPI = (formData) => {
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
      originCityId: route.originCityId,
      destinationCityId: route.destinationCityId
    })) || []
  };
};

/**
 * Transform API response data to form format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Form-ready data format
 */
export const transformAPIResponseToForm = (apiData) => {
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
      createdAt: route.createdAt
    })) || [],
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy
  };
};

/**
 * Create route master with error handling
 * @param {Object} routeData - Route data to create
 * @param {Object} options - Additional options
 * @param {boolean} options.useMock - Whether to use mock data
 * @returns {Promise} - Promise with success/error result
 */
export const createRouteMaster = async (routeData, options = {}) => {
  const { useMock = false } = options;

  try {
    // Transform form data to API format
    const apiData = transformFormDataToAPI(routeData);
    
    let response;
    if (useMock) {
      response = await postRouteMasterMock(apiData);
    } else {
      response = await postRouteMaster(apiData);
    }

    return {
      success: true,
      data: response.data?.Data || response.Data,
      message: response.data?.Message?.Text || response.Message?.Text || "Route created successfully",
      transformedData: transformAPIResponseToForm(response.data?.Data || response.Data)
    };
  } catch (error) {
    console.error("Error creating route:", error);
    
    return {
      success: false,
      error: error.message || "Failed to create route",
      details: error.response?.data || error
    };
  }
};

/**
 * Validate route creation data
 * @param {Object} routeData - Route data to validate
 * @returns {Object} - Validation result
 */
export const validateRouteData = (routeData) => {
  const errors = [];

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
 * Create route with form validation
 * @param {Object} formData - Form data
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise with validation and creation result
 */
export const createRouteWithValidation = async (formData, options = {}) => {
  // Validate data first
  const validation = validateRouteData(formData);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: "Validation failed",
      validationErrors: validation.errors,
      details: "Please fix the validation errors before creating the route"
    };
  }

  // Create route if validation passes
  return await createRouteMaster(formData, options);
};

/**
 * Generate route alias from provinces
 * @param {Array} originProvinces - Origin provinces
 * @param {Array} destinationProvinces - Destination provinces
 * @returns {string} - Generated alias
 */
export const generateRouteAlias = (originProvinces, destinationProvinces) => {
  if (!originProvinces || !destinationProvinces || 
      originProvinces.length === 0 || destinationProvinces.length === 0) {
    return "";
  }

  const originNames = originProvinces
    .map(province => typeof province === "object" ? province.name : province)
    .join(", ");
  
  const destinationNames = destinationProvinces
    .map(province => typeof province === "object" ? province.name : province)
    .join(", ");

  return `${originNames} - ${destinationNames}`;
};
