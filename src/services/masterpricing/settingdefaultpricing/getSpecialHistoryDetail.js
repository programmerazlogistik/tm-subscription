import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

/**
 * Fetcher function to get special pricing history detail data
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getSpecialHistoryDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching special pricing history detail data
 * @param {string} id - History record ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetSpecialHistoryDetail = (id, options = {}) => {
  const cacheKey = id
    ? `/v1/bo/pricing/setting/default/special/history/${id}`
    : null;

  return useSWR(cacheKey, getSpecialHistoryDetail, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};
