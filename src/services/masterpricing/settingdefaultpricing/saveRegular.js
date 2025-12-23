import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

/**
 * Save regular pricing data
 * @param {Object} data - The pricing data to save
 * @returns {Promise} - Axios response promise
 */
export const saveRegular = async (data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post("/v1/bo/pricing/setting/default/regular", data);
};

/**
 * Mock save function for development/testing
 * @param {Object} data - The pricing data to save
 * @returns {Promise} - Mock response promise
 */
export const saveRegularMock = async (data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Return mock success response
  return {
    data: {
      Message: {
        Code: 200,
        Text: "OK",
      },
      Data: {
        success: true,
        message: "Data berhasil disimpan",
      },
    },
  };
};