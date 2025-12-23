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
      provinceId: 11,
      provinceName: "ACEH",
      cities: [
        {
          id: 1105,
          name: "KAB. ACEH BARAT"
        },
        {
          id: 1112,
          name: "KAB. ACEH BARAT DAYA"
        },
        {
          id: 1106,
          name: "KAB. ACEH BESAR"
        },
        {
          id: 1114,
          name: "KAB. ACEH JAYA"
        },
        {
          id: 1101,
          name: "KAB. ACEH SELATAN"
        },
        {
          id: 1110,
          name: "KAB. ACEH SINGKIL"
        },
        {
          id: 1116,
          name: "KAB. ACEH TAMIANG"
        },
        {
          id: 1104,
          name: "KAB. ACEH TENGAH"
        },
        {
          id: 1102,
          name: "KAB. ACEH TENGGARA"
        },
        {
          id: 1103,
          name: "KAB. ACEH TIMUR"
        },
        {
          id: 1108,
          name: "KAB. ACEH UTARA"
        },
        {
          id: 1117,
          name: "KAB. BENER MERIAH"
        },
        {
          id: 1111,
          name: "KAB. BIREUEN"
        },
        {
          id: 1113,
          name: "KAB. GAYO LUES"
        },
        {
          id: 1115,
          name: "KAB. NAGAN RAYA"
        },
        {
          id: 1107,
          name: "KAB. PIDIE"
        },
        {
          id: 1118,
          name: "KAB. PIDIE JAYA"
        },
        {
          id: 1109,
          name: "KAB. SIMEULUE"
        },
        {
          id: 1171,
          name: "KOTA BANDA ACEH"
        },
        {
          id: 1174,
          name: "KOTA LANGSA"
        },
        {
          id: 1173,
          name: "KOTA LHOKSEUMAWE"
        },
        {
          id: 1172,
          name: "KOTA SABANG"
        },
        {
          id: 1175,
          name: "KOTA SUBULUSSALAM"
        }
      ]
    },
    {
      provinceId: 12,
      provinceName: "SUMATERA UTARA",
      cities: [
        {
          id: 1209,
          name: "KAB. ASAHAN"
        },
        {
          id: 1219,
          name: "KAB. BATU BARA"
        },
        {
          id: 1211,
          name: "KAB. DAIRI"
        },
        {
          id: 1207,
          name: "KAB. DELI SERDANG"
        },
        {
          id: 1216,
          name: "KAB. HUMBANG HASUNDUTAN"
        },
        {
          id: 1206,
          name: "KAB. KARO"
        },
        {
          id: 1210,
          name: "KAB. LABUHANBATU"
        },
        {
          id: 1222,
          name: "KAB. LABUHANBATU SELATAN"
        },
        {
          id: 1223,
          name: "KAB. LABUHANBATU UTARA"
        },
        {
          id: 1205,
          name: "KAB. LANGKAT"
        },
        {
          id: 1213,
          name: "KAB. MANDAILING NATAL"
        },
        {
          id: 1204,
          name: "KAB. NIAS"
        },
        {
          id: 1225,
          name: "KAB. NIAS BARAT"
        },
        {
          id: 1214,
          name: "KAB. NIAS SELATAN"
        },
        {
          id: 1224,
          name: "KAB. NIAS UTARA"
        },
        {
          id: 1221,
          name: "KAB. PADANG LAWAS"
        },
        {
          id: 1220,
          name: "KAB. PADANG LAWAS UTARA"
        },
        {
          id: 1215,
          name: "KAB. PAKPAK BHARAT"
        },
        {
          id: 1217,
          name: "KAB. SAMOSIR"
        },
        {
          id: 1218,
          name: "KAB. SERDANG BEDAGAI"
        },
        {
          id: 1208,
          name: "KAB. SIMALUNGUN"
        },
        {
          id: 1203,
          name: "KAB. TAPANULI SELATAN"
        },
        {
          id: 1201,
          name: "KAB. TAPANULI TENGAH"
        },
        {
          id: 1202,
          name: "KAB. TAPANULI UTARA"
        },
        {
          id: 1212,
          name: "KAB. TOBA SAMOSIR"
        },
        {
          id: 1275,
          name: "KOTA BINJAI"
        },
        {
          id: 1278,
          name: "KOTA GUNUNGSITOLI"
        },
        {
          id: 1271,
          name: "KOTA MEDAN"
        },
        {
          id: 1277,
          name: "KOTA PADANG SIDEMPUAN"
        },
        {
          id: 1272,
          name: "KOTA PEMATANGSIANTAR"
        },
        {
          id: 1273,
          name: "KOTA SIBOLGA"
        },
        {
          id: 1274,
          name: "KOTA TANJUNG BALAI"
        },
        {
          id: 1276,
          name: "KOTA TEBING TINGGI"
        }
      ]
    },
    {
      provinceId: 31,
      provinceName: "DKI JAKARTA",
      cities: [
        {
          id: 3171,
          name: "KOTA JAKARTA PUSAT"
        },
        {
          id: 3172,
          name: "KOTA JAKARTA UTARA"
        },
        {
          id: 3173,
          name: "KOTA JAKARTA BARAT"
        },
        {
          id: 3174,
          name: "KOTA JAKARTA SELATAN"
        },
        {
          id: 3175,
          name: "KOTA JAKARTA TIMUR"
        }
      ]
    }
  ],
  Type: "/v1/bo/pricing/master/route/cities?provinceIds=11,12,31"
};

/**
 * Fetcher function to get cities by province IDs
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getCityByProvince = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to flat city list format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Flattened array of cities with province info
 */
export const transformCitiesToFlatList = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.flatMap(province => 
    province.cities?.map(city => ({
      id: city.id,
      name: city.name,
      provinceId: province.provinceId,
      provinceName: province.provinceName,
      // For dropdown compatibility
      value: city.id,
      label: city.name,
    })) || []
  );
};

/**
 * Transform API response data to grouped format by province
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Grouped cities by province
 */
export const transformCitiesToGroupedFormat = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map(province => ({
    provinceId: province.provinceId,
    provinceName: province.provinceName,
    cities: province.cities?.map(city => ({
      id: city.id,
      name: city.name,
      value: city.id,
      label: city.name,
    })) || []
  }));
};

/**
 * Transform API response data to dropdown format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Cities formatted for dropdown usage
 */
export const transformCitiesToDropdownFormat = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData;
};

/**
 * Build query parameters for cities by province API
 * @param {Object} params - Query parameters
 * @param {Array|string} params.provinceIds - Array of province IDs or comma-separated string
 * @returns {string} - Query string
 */
export const buildCityByProvinceQuery = ({ provinceIds = [] } = {}) => {
  const params = new URLSearchParams();
  
  // Handle both array and string inputs
  let provinceIdsString = "";
  if (Array.isArray(provinceIds)) {
    provinceIdsString = provinceIds.join(",");
  } else if (typeof provinceIds === "string") {
    provinceIdsString = provinceIds;
  }
  
  if (provinceIdsString) {
    params.append("provinceIds", provinceIdsString);
  }
  
  return params.toString();
};

/**
 * SWR hook for fetching cities by province IDs
 * @param {Object} params - Query parameters
 * @param {Array|string} params.provinceIds - Array of province IDs or comma-separated string
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetCityByProvince = (params = {}, options = {}) => {
  const { provinceIds = [] } = params;
  
  const queryString = buildCityByProvinceQuery({ provinceIds });
  const cacheKey = `/v1/bo/pricing/master/route/cities${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getCityByProvince, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get cities by province with mock data for development
 * @param {Object} params - Query parameters
 * @param {Array|string} params.provinceIds - Array of province IDs or comma-separated string
 * @returns {Promise} - Mock data promise
 */
export const getCityByProvinceMock = async (params = {}) => {
  const { provinceIds = [] } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Handle both array and string inputs
  let requestedProvinceIds = [];
  if (Array.isArray(provinceIds)) {
    requestedProvinceIds = provinceIds;
  } else if (typeof provinceIds === "string") {
    requestedProvinceIds = provinceIds.split(",").map(id => parseInt(id.trim()));
  }
  
  // Filter mock data based on requested province IDs
  let filteredData = mockAPIResult.Data;
  if (requestedProvinceIds.length > 0) {
    filteredData = mockAPIResult.Data.filter(province => 
      requestedProvinceIds.includes(province.provinceId)
    );
  }
  
  return {
    ...mockAPIResult,
    Data: filteredData,
    Type: `/v1/bo/pricing/master/route/cities?provinceIds=${requestedProvinceIds.join(",")}`
  };
};

/**
 * Get cities for specific province
 * @param {number} provinceId - Province ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object
 */
export const useGetCitiesBySingleProvince = (provinceId, options = {}) => {
  return useGetCityByProvince({ provinceIds: [provinceId] }, options);
};

/**
 * Get cities for multiple provinces
 * @param {Array} provinceIds - Array of province IDs
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object
 */
export const useGetCitiesByMultipleProvinces = (provinceIds = [], options = {}) => {
  return useGetCityByProvince({ provinceIds }, options);
};

/**
 * Get all cities as flat list
 * @param {Array} provinceIds - Array of province IDs
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with flattened city list
 */
export const useGetCitiesAsFlatList = (provinceIds = [], options = {}) => {
  const { data, error, isLoading, mutate } = useGetCityByProvince({ provinceIds }, options);
  
  const flatCityList = data?.data?.Data ? transformCitiesToFlatList(data.data.Data) : [];
  
  return {
    data: flatCityList,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};

/**
 * Get cities grouped by province
 * @param {Array} provinceIds - Array of province IDs
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response with grouped city data
 */
export const useGetCitiesGroupedByProvince = (provinceIds = [], options = {}) => {
  const { data, error, isLoading, mutate } = useGetCityByProvince({ provinceIds }, options);
  
  const groupedCityList = data?.data?.Data ? transformCitiesToGroupedFormat(data.data.Data) : [];
  
  return {
    data: groupedCityList,
    error,
    isLoading,
    mutate,
    rawData: data?.data?.Data,
  };
};
