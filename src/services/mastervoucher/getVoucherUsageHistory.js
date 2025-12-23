import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

const useFetcherMuatrans = true;

export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "OK",
    },
    Data: {
      data: [
        {
          id: "db5c70a7-143c-4a0f-a392-44e9d2e122fb",
          userId: "247f7a13-3854-43d4-824c-190b5e4d0886",
          userName: null,
          userEmail: null,
          userPhone: null,
          invoiceNumber: "INV/DUMMY-1210",
          usageDate: "2025-09-10T03:30:00.000Z",
          discountAmount: 50000,
          originalOrderAmount: 200000,
          finalOrderAmount: 150000,
          createdAt: "2025-09-15T04:42:36.156Z",
        },
        {
          id: "db5c70a7-143c-4a0f-a392-44e9d2e151df",
          userId: "247f7a13-3854-43d4-824c-190b5e4d0886",
          userName: null,
          userEmail: null,
          userPhone: null,
          invoiceNumber: "INV/DUMMY-1210",
          usageDate: "2025-09-12T07:15:00.000Z",
          discountAmount: 25000,
          originalOrderAmount: 100000,
          finalOrderAmount: 75000,
          createdAt: "2025-09-15T04:42:36.156Z",
        },
        {
          id: "db5c70a7-143c-4a0f-a392-44e9d2e909fb",
          userId: "247f7a13-3854-43d4-824c-190b5e4d0886",
          userName: null,
          userEmail: null,
          userPhone: null,
          invoiceNumber: "INV/DUMMY-1210",
          usageDate: "2025-09-14T09:20:00.000Z",
          discountAmount: 75000,
          originalOrderAmount: 300000,
          finalOrderAmount: 225000,
          createdAt: "2025-09-15T04:42:36.156Z",
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 3,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
      summary: {
        totalUsages: 3,
        totalDiscountGiven: 150000,
        dateRange: {
          from: "2025-08-15T17:00:00.000Z",
          to: "2025-09-15T04:46:46.443Z",
        },
        searchTerm: null,
      },
      voucher: {
        id: "db5c70a7-143c-4a0f-a392-44e9d2e151fb",
        code: "NEWVOUCHER-2025-001",
      },
    },
    Type: "/v1/bo/vouchers/db5c70a7-143c-4a0f-a392-44e9d2e151fb/history/usages",
  },
};

/**
 * Fetcher function to get voucher usage history with pagination
 * @param {string} voucherId - The voucher ID
 * @param {Object} params - Query parameters for the API call
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Promise} - Axios response promise
 */
export const getVoucherUsageHistory = async (voucherId, params = {}) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;

  // Build query string from params
  const queryParams = new URLSearchParams();

  // Add each parameter to the query string if it has a value
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      queryParams.set(key, value);
    }
  });

  const queryString = queryParams.toString();
  const url = `/v1/bo/vouchers/${voucherId}/history/usages`;
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return fetcher.get(finalUrl);
};

/**
 * SWR hook for fetching voucher usage history
 * @param {string} voucherId - The voucher ID
 * @param {Object} params - API parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Object} - SWR response object
 */
export const useVoucherUsageHistory = (voucherId, params = {}) => {
  return useSWR(
    voucherId ? [`/v1/bo/vouchers/${voucherId}/history/usages`, params] : null,
    ([url, params]) => getVoucherUsageHistory(voucherId, params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
