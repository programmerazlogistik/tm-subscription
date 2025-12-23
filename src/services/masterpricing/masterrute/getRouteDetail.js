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
  Data: {
    id: "731df77a-a9df-43df-9564-fba370e1d38c",
    alias: "Sumatra - SumatrA",
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
    createdAt: "2025-09-18T09:13:58.811Z",
    createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
    specialRoutes: [
      {
        id: "23402548-006f-4e20-97c2-fe8871c9e456",
        originCityId: 1103,
        originCityName: "KAB. ACEH TIMUR",
        destinationCityId: 1105,
        destinationCityName: "KAB. ACEH BARAT",
        isActive: true,
        createdAt: "2025-09-18T09:54:08.466Z"
      },
      {
        id: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
        originCityId: 1106,
        originCityName: "KAB. ACEH BESAR",
        destinationCityId: 1110,
        destinationCityName: "KAB. ACEH SINGKIL",
        isActive: true,
        createdAt: "2025-09-19T01:44:50.283Z"
      },
      {
        id: "5e458ce9-f728-4dd6-a95a-0f638e8e411f",
        originCityId: 1110,
        originCityName: "KAB. ACEH SINGKIL",
        destinationCityId: 1105,
        destinationCityName: "KAB. ACEH BARAT",
        isActive: true,
        createdAt: "2025-09-19T01:44:50.283Z"
      }
    ]
  },
  Type: "/v1/bo/pricing/master/route/731df77a-a9df-43df-9564-fba370e1d38c"
};

/**
 * Fetcher function to get route detail by ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getRouteDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to form values format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for form usage
 */
export const transformRouteDetailToFormValues = (apiData) => {
  if (!apiData) return {};

  // Parse dates
  const createdDate = new Date(apiData.createdAt);

  // Transform origin provinces - store as objects with ID information
  const originProvinces = apiData.originProvinces?.map((province) => ({
    value: province.id,
    label: province.name,
    id: province.id,
    name: province.name,
  })) || [];

  // Transform destination provinces - store as objects with ID information
  const destinationProvinces = apiData.destinationProvinces?.map((province) => ({
    value: province.id,
    label: province.name,
    id: province.id,
    name: province.name,
  })) || [];

  // Transform special routes
  const specialRoutes = apiData.specialRoutes?.map((route) => ({
    id: route.id,
    originCityId: route.originCityId,
    originCityName: route.originCityName,
    destinationCityId: route.destinationCityId,
    destinationCityName: route.destinationCityName,
    isActive: route.isActive,
    createdAt: route.createdAt,
  })) || [];

  return {
    id: apiData.id,
    alias: apiData.alias || "",
    originProvinces,
    destinationProvinces,
    isActive: apiData.isActive || false,
    specialRoutes,
    createdAt: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    createdBy: apiData.createdBy || "",
    // Keep original data for other uses
    originProvincesData: apiData.originProvinces || [],
    destinationProvincesData: apiData.destinationProvinces || [],
  };
};

/**
 * Transform API response data to table format for special routes
 * @param {Array} specialRoutes - Special routes data from API
 * @returns {Array} - Transformed data for table usage
 */
export const transformSpecialRoutesToTableData = (specialRoutes) => {
  if (!specialRoutes || !Array.isArray(specialRoutes)) return [];

  return specialRoutes.map((route) => ({
    id: route.id,
    originCityName: route.originCityName,
    destinationCityName: route.destinationCityName,
    isActive: route.isActive,
    createdAt: route.createdAt,
    // Keep original data for other uses
    originCityId: route.originCityId,
    destinationCityId: route.destinationCityId,
  }));
};

/**
 * Transform API response data to detail page format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for detail page usage
 */
export const transformRouteDetailToDetailPage = (apiData) => {
  if (!apiData) return {};

  const createdDate = new Date(apiData.createdAt);

  return {
    id: apiData.id,
    alias: apiData.alias || "",
    originProvinces: apiData.originProvinces || [],
    destinationProvinces: apiData.destinationProvinces || [],
    isActive: apiData.isActive || false,
    specialRoutes: apiData.specialRoutes || [],
    createdAt: createdDate.toISOString(),
    createdBy: apiData.createdBy || "",
    // Formatted display values
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
  };
};

/**
 * SWR hook for fetching route detail
 * @param {string} routeId - Required: ID of the route to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetRouteDetail = (routeId, options = {}) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }

  const cacheKey = `/v1/bo/pricing/master/route/${routeId}`;

  return useSWR(cacheKey, getRouteDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get route detail with mock data for development
 * @param {string} routeId - ID of the route to fetch
 * @returns {Promise} - Mock data promise
 */
export const getRouteDetailMock = async (routeId) => {
  if (!routeId) {
    throw new Error("routeId parameter is required");
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: routeId, // Use the provided routeId
    },
    Type: `/v1/bo/pricing/master/route/${routeId}`
  };
};

/**
 * Get route detail for form usage (edit mode)
 * @param {string} routeId - ID of the route to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with transformed form data
 */
export const useGetRouteDetailForForm = (routeId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetRouteDetail(routeId, options);
  
  const formData = data?.data?.Data ? transformRouteDetailToFormValues(data.data.Data) : null;
  
  return {
    data: formData,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};

/**
 * Get route detail for detail page usage
 * @param {string} routeId - ID of the route to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with transformed detail data
 */
export const useGetRouteDetailForDetail = (routeId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetRouteDetail(routeId, options);
  
  const detailData = data?.data?.Data ? transformRouteDetailToDetailPage(data.data.Data) : null;
  
  return {
    data: detailData,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};
