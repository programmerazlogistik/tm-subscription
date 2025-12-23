import useSWR from "swr";

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
  Data: [
    {
      id: 11,
      name: "ACEH"
    },
    {
      id: 51,
      name: "BALI"
    },
    {
      id: 36,
      name: "BANTEN"
    },
    {
      id: 17,
      name: "BENGKULU"
    },
    {
      id: 34,
      name: "DAERAH ISTIMEWA YOGYAKARTA"
    },
    {
      id: 31,
      name: "DKI JAKARTA"
    },
    {
      id: 75,
      name: "GORONTALO"
    },
    {
      id: 15,
      name: "JAMBI"
    },
    {
      id: 32,
      name: "JAWA BARAT"
    },
    {
      id: 33,
      name: "JAWA TENGAH"
    },
    {
      id: 35,
      name: "JAWA TIMUR"
    },
    {
      id: 61,
      name: "KALIMANTAN BARAT"
    },
    {
      id: 63,
      name: "KALIMANTAN SELATAN"
    },
    {
      id: 62,
      name: "KALIMANTAN TENGAH"
    },
    {
      id: 64,
      name: "KALIMANTAN TIMUR"
    },
    {
      id: 65,
      name: "KALIMANTAN UTARA"
    },
    {
      id: 19,
      name: "KEPULAUAN BANGKA BELITUNG"
    },
    {
      id: 21,
      name: "KEPULAUAN RIAU"
    },
    {
      id: 18,
      name: "LAMPUNG"
    },
    {
      id: 81,
      name: "MALUKU"
    },
    {
      id: 82,
      name: "MALUKU UTARA"
    },
    {
      id: 52,
      name: "NUSA TENGGARA BARAT"
    },
    {
      id: 53,
      name: "NUSA TENGGARA TIMUR"
    },
    {
      id: 91,
      name: "PAPUA"
    },
    {
      id: 92,
      name: "PAPUA BARAT"
    },
    {
      id: 14,
      name: "RIAU"
    },
    {
      id: 76,
      name: "SULAWESI BARAT"
    },
    {
      id: 73,
      name: "SULAWESI SELATAN"
    },
    {
      id: 72,
      name: "SULAWESI TENGAH"
    },
    {
      id: 74,
      name: "SULAWESI TENGGARA"
    },
    {
      id: 71,
      name: "SULAWESI UTARA"
    },
    {
      id: 13,
      name: "SUMATERA BARAT"
    },
    {
      id: 16,
      name: "SUMATERA SELATAN"
    },
    {
      id: 12,
      name: "SUMATERA UTARA"
    }
  ],
  Type: "/v1/bo/pricing/master/route/provinces"
};

/**
 * Fetcher function to get province list by type
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getProvinceRoute = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformProvinceDataToDropdown = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((province) => ({
    value: province.id,
    label: province.name,
    id: province.id,
    name: province.name,
  }));
};

/**
 * Transform API response data to MultiSelectDropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for MultiSelectDropdown usage
 */
export const transformProvinceDataToMultiSelect = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((province) => ({
    value: province.id,
    label: province.name,
    id: province.id,
    name: province.name,
  }));
};

/**
 * Build query parameters for province route API
 * @param {Object} params - Query parameters
 * @param {string} params.type - Type of province ("asal" or "tujuan")
 * @returns {string} - Query string
 */
export const buildProvinceRouteQuery = ({ type = "asal" } = {}) => {
  const params = new URLSearchParams();
  
  if (type) {
    params.append("type", type);
  }
  
  return params.toString();
};

/**
 * SWR hook for fetching province list by type
 * @param {Object} params - Query parameters
 * @param {string} params.type - Type of province ("asal" or "tujuan")
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetProvinceRoute = (params = {}, options = {}) => {
  const { type = "asal" } = params;
  
  const queryString = buildProvinceRouteQuery({ type });
  const cacheKey = `/v1/bo/pricing/master/route/provinces${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getProvinceRoute, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get province list with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.type - Type of province ("asal" or "tujuan")
 * @returns {Promise} - Mock data promise
 */
export const getProvinceRouteMock = async (params = {}) => {
  const { type = "asal" } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // For mock data, we return the same data regardless of type
  // In real implementation, the API might return different data based on type
  return {
    ...mockAPIResult,
    // You could add type-specific filtering here if needed
  };
};

/**
 * Get provinces for origin (asal)
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object
 */
export const useGetOriginProvinces = (options = {}) => {
  return useGetProvinceRoute({ type: "asal" }, options);
};

/**
 * Get provinces for destination (tujuan)
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object
 */
export const useGetDestinationProvinces = (options = {}) => {
  return useGetProvinceRoute({ type: "tujuan" }, options);
};
