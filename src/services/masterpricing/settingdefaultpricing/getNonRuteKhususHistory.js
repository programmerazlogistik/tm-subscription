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
      id: "5d8a9f5d-56c6-4824-9175-49c245857edf",
      createdAt: "2025-09-25T15:00:17.531Z",
      updatedAt: "2025-09-25T15:00:17.531Z",
      action: "UPDATE",
      updatedBy: "Backend BO GM",
    },
    {
      id: "293ea4fb-8e12-4ff0-8639-9c1367428a8b",
      createdAt: "2025-09-25T10:12:06.630Z",
      updatedAt: "2025-09-25T10:12:06.630Z",
      action: "UPDATE",
      updatedBy: "Backend BO GM",
    },
    {
      id: "be072657-b53b-47ca-ab2d-4e3575ec2885",
      createdAt: "2025-09-25T10:10:25.103Z",
      updatedAt: "2025-09-25T10:10:25.103Z",
      action: "CREATE",
      updatedBy: "Backend BO GM",
    },
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 3,
    recordsPerPage: 10,
    hasNext: false,
    hasPrev: false,
  },
  Type: "/v1/bo/pricing/setting/default/regular/history",
};

/**
 * Fetcher function to get non-rute-khusus history data
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getNonRuteKhususHistory = async (url) => {
  // Use the actual fetcher instead of mock data
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching non-rute-khusus history data
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetNonRuteKhususHistory = (
  page = 1,
  limit = 10,
  options = {}
) => {
  const cacheKey = `/v1/bo/pricing/setting/default/regular/history?page=${page}&limit=${limit}`;

  return useSWR(cacheKey, getNonRuteKhususHistory, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};
