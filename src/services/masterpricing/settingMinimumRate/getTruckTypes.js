import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: [
    {
      headTruckId: "550e8400-e29b-41d4-a716-446655440201",
      headName: "Colt Diesel",
      truckTypes: [
        {
          id: "550e8400-e29b-41d4-a716-446655440201",
          description: "Colt Diesel Engkel",
          carrierName: "Colt Diesel Engkel",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440202",
          description: "Colt Diesel Double",
          carrierName: "Colt Diesel Double",
        },
      ],
    },
    {
      headTruckId: "550e8400-e29b-41d4-a716-446655440203",
      headName: "Medium Truck",
      truckTypes: [
        {
          id: "550e8400-e29b-41d4-a716-446655440203",
          description: "Medium Truk 4 x 2 (Rigid)",
          carrierName: "Medium Truk 4 x 2 (Rigid)",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440204",
          description: "Medium Truck 4 x 2 + Gandengan",
          carrierName: "Medium Truck 4 x 2 + Gandengan",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440205",
          description: "Medium Truck 6 x 2 (Rigid)",
          carrierName: "Medium Truck 6 x 2 (Rigid)",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440206",
          description: "Medium Truck 6 x 4",
          carrierName: "Medium Truck 6 x 4",
        },
      ],
    },
    {
      headTruckId: "550e8400-e29b-41d4-a716-446655440207",
      headName: "Tractor Head",
      truckTypes: [
        {
          id: "550e8400-e29b-41d4-a716-446655440207",
          description: "Tractor Head 4 x 2",
          carrierName: "Tractor Head 4 x 2",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440208",
          description: "Tractor Head 6 x 4",
          carrierName: "Tractor Head 6 x 4",
        },
      ],
    },
  ],
  Type: "/v1/bo/pricing/setting/min-rates/trucks",
};

/**
 * Fetcher function to get truck types
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getTruckTypes = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformTruckTypesToDropdownData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  // Flatten the head trucks structure to get all truck types
  const allTruckTypes = apiData.flatMap(
    (headTruck) => headTruck.truckTypes || []
  );

  return allTruckTypes.map((truckType) => ({
    value: truckType.id,
    label: truckType.description,
    id: truckType.id,
    description: truckType.description,
  }));
};

/**
 * Transform API response data to select format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for select usage
 */
export const transformTruckTypesToSelectData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  // Flatten the head trucks structure to get all truck types
  const allTruckTypes = apiData.flatMap(
    (headTruck) => headTruck.truckTypes || []
  );

  return allTruckTypes.map((truckType) => ({
    value: truckType.id,
    label: truckType.description,
    id: truckType.id,
    description: truckType.description,
  }));
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformTruckTypesToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  // Flatten the head trucks structure to get all truck types
  const allTruckTypes = apiData.flatMap((headTruck) =>
    (headTruck.truckTypes || []).map((truckType) => ({
      ...truckType,
      headName: headTruck.headName,
    }))
  );

  return allTruckTypes.map((truckType, index) => ({
    id: truckType.id,
    description: truckType.description,
    headName: truckType.headName,
    // Additional table data
    index: index + 1,
    // Formatted display values
    descriptionFormatted: truckType.description,
    // Additional info
    isColtDiesel: truckType.description.toLowerCase().includes("colt diesel"),
    isMediumTruck: truckType.description.toLowerCase().includes("medium truck"),
    isTractorHead: truckType.description.toLowerCase().includes("tractor head"),
    vehicleCategory: getVehicleCategory(truckType.description),
    categoryColor: getVehicleCategoryColor(truckType.description),
    categoryBadge: getVehicleCategoryBadge(truckType.description),
  }));
};

/**
 * Transform API response data to form format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for form usage
 */
export const transformTruckTypesToFormData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  // Return the head trucks structure as is
  return apiData;
};

/**
 * Get vehicle category from description
 * @param {string} description - Truck type description
 * @returns {string} - Vehicle category
 */
export const getVehicleCategory = (description) => {
  if (!description) return "Unknown";

  const desc = description.toLowerCase();

  if (desc.includes("colt diesel")) {
    return "Colt Diesel";
  } else if (desc.includes("medium truck")) {
    return "Medium Truck";
  } else if (desc.includes("tractor head")) {
    return "Tractor Head";
  }

  return "Other";
};

/**
 * Get vehicle category color class
 * @param {string} description - Truck type description
 * @returns {string} - CSS class
 */
export const getVehicleCategoryColor = (description) => {
  const category = getVehicleCategory(description);

  const colorMap = {
    "Colt Diesel": "text-blue-600 bg-blue-100",
    "Medium Truck": "text-green-600 bg-green-100",
    "Tractor Head": "text-purple-600 bg-purple-100",
    Other: "text-gray-600 bg-gray-100",
  };

  return colorMap[category] || "text-gray-600 bg-gray-100";
};

/**
 * Get vehicle category badge class
 * @param {string} description - Truck type description
 * @returns {string} - CSS class for badge
 */
export const getVehicleCategoryBadge = (description) => {
  const category = getVehicleCategory(description);

  const badgeMap = {
    "Colt Diesel": "bg-blue-100 text-blue-800 border-blue-200",
    "Medium Truck": "bg-green-100 text-green-800 border-green-200",
    "Tractor Head": "bg-purple-100 text-purple-800 border-purple-200",
    Other: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return badgeMap[category] || "bg-gray-100 text-gray-800 border-gray-200";
};

/**
 * SWR hook for fetching truck types
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetTruckTypes = (options = {}) => {
  const cacheKey = "/v1/bo/pricing/setting/min-rates/trucks";

  return useSWR(cacheKey, getTruckTypes, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get truck types with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getTruckTypesMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockAPIResult;
};

/**
 * Filter truck types by category
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered truck types data
 */
export const filterTruckTypesByCategory = (truckTypesData, category) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !category)
    return truckTypesData;

  return truckTypesData.filter(
    (truckType) => getVehicleCategory(truckType.description) === category
  );
};

/**
 * Search truck types by description
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered truck types data
 */
export const searchTruckTypesByDescription = (truckTypesData, searchTerm) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !searchTerm)
    return truckTypesData;

  return truckTypesData.filter((truckType) =>
    truckType.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort truck types by description
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted truck types data
 */
export const sortTruckTypesByDescription = (truckTypesData, order = "asc") => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return [];

  return [...truckTypesData].sort((a, b) => {
    const comparison = a.description.localeCompare(b.description);
    return order === "desc" ? -comparison : comparison;
  });
};

/**
 * Sort truck types by category
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted truck types data
 */
export const sortTruckTypesByCategory = (truckTypesData, order = "asc") => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return [];

  return [...truckTypesData].sort((a, b) => {
    const categoryA = getVehicleCategory(a.description);
    const categoryB = getVehicleCategory(b.description);
    const comparison = categoryA.localeCompare(categoryB);
    return order === "desc" ? -comparison : comparison;
  });
};

/**
 * Get truck types statistics
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Object} - Statistics object
 */
export const getTruckTypesStatistics = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) {
    return {
      total: 0,
      byCategory: {},
      categories: [],
    };
  }

  const stats = {
    total: truckTypesData.length,
    byCategory: {},
    categories: [],
  };

  truckTypesData.forEach((truckType) => {
    const category = getVehicleCategory(truckType.description);
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
  });

  stats.categories = Object.keys(stats.byCategory);

  return stats;
};

/**
 * Get truck type by ID
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} truckTypeId - Truck type ID
 * @returns {Object|null} - Truck type data or null
 */
export const getTruckTypeById = (truckTypesData, truckTypeId) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !truckTypeId)
    return null;

  return (
    truckTypesData.find((truckType) => truckType.id === truckTypeId) || null
  );
};

/**
 * Get truck types by category
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} category - Category name
 * @returns {Array} - Filtered truck types data
 */
export const getTruckTypesByCategory = (truckTypesData, category) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !category) return [];

  return truckTypesData.filter(
    (truckType) => getVehicleCategory(truckType.description) === category
  );
};

/**
 * Get truck types summary
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Object} - Summary object
 */
export const getTruckTypesSummary = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) {
    return {
      total: 0,
      categories: [],
      mostCommonCategory: null,
      coltDieselCount: 0,
      mediumTruckCount: 0,
      tractorHeadCount: 0,
    };
  }

  const stats = getTruckTypesStatistics(truckTypesData);

  // Find most common category
  const mostCommonCategory = Object.keys(stats.byCategory).reduce(
    (a, b) => (stats.byCategory[a] > stats.byCategory[b] ? a : b),
    null
  );

  return {
    total: stats.total,
    categories: stats.categories,
    mostCommonCategory,
    coltDieselCount: stats.byCategory["Colt Diesel"] || 0,
    mediumTruckCount: stats.byCategory["Medium Truck"] || 0,
    tractorHeadCount: stats.byCategory["Tractor Head"] || 0,
  };
};

/**
 * Validate truck type data
 * @param {Object} truckTypeData - Truck type data to validate
 * @returns {Object} - Validation result
 */
export const validateTruckTypeData = (truckTypeData) => {
  const errors = {};

  if (!truckTypeData.id || truckTypeData.id.trim() === "") {
    errors.id = "Truck Type ID is required";
  }

  if (!truckTypeData.description || truckTypeData.description.trim() === "") {
    errors.description = "Truck Type description is required";
  } else if (truckTypeData.description.trim().length < 3) {
    errors.description = "Truck Type description must be at least 3 characters";
  } else if (truckTypeData.description.trim().length > 100) {
    errors.description =
      "Truck Type description must be less than 100 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Get truck type options for dropdown with categories
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Array} - Truck type options grouped by category
 */
export const getTruckTypeOptionsGrouped = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return [];

  const grouped = {};

  truckTypesData.forEach((truckType) => {
    const category = getVehicleCategory(truckType.description);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({
      value: truckType.id,
      label: truckType.description,
      id: truckType.id,
      description: truckType.description,
    });
  });

  // Convert to array format
  return Object.keys(grouped).map((category) => ({
    label: category,
    options: grouped[category],
  }));
};

/**
 * Get truck type options for flat dropdown
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Array} - Flat truck type options
 */
export const getTruckTypeOptionsFlat = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return [];

  return truckTypesData.map((truckType) => ({
    value: truckType.id,
    label: truckType.description,
    id: truckType.id,
    description: truckType.description,
    category: getVehicleCategory(truckType.description),
  }));
};

/**
 * Check if truck type exists
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} truckTypeId - Truck type ID to check
 * @returns {boolean} - Whether truck type exists
 */
export const checkTruckTypeExists = (truckTypesData, truckTypeId) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !truckTypeId)
    return false;

  return truckTypesData.some((truckType) => truckType.id === truckTypeId);
};

/**
 * Get truck type by description
 * @param {Array} truckTypesData - Array of truck types data
 * @param {string} description - Truck type description
 * @returns {Object|null} - Truck type data or null
 */
export const getTruckTypeByDescription = (truckTypesData, description) => {
  if (!truckTypesData || !Array.isArray(truckTypesData) || !description)
    return null;

  return (
    truckTypesData.find(
      (truckType) =>
        truckType.description.toLowerCase() === description.toLowerCase()
    ) || null
  );
};

/**
 * Get unique categories from truck types
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Array} - Array of unique categories
 */
export const getUniqueCategories = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return [];

  const categories = truckTypesData.map((truckType) =>
    getVehicleCategory(truckType.description)
  );

  return [...new Set(categories)].sort();
};

/**
 * Get truck types count by category
 * @param {Array} truckTypesData - Array of truck types data
 * @returns {Object} - Count by category
 */
export const getTruckTypesCountByCategory = (truckTypesData) => {
  if (!truckTypesData || !Array.isArray(truckTypesData)) return {};

  const count = {};

  truckTypesData.forEach((truckType) => {
    const category = getVehicleCategory(truckType.description);
    count[category] = (count[category] || 0) + 1;
  });

  return count;
};
