import useSWRMutation from "swr/mutation";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Voucher status updated successfully"
    },
    Data: {
      id: "db5c70a7-143c-4a0f-a392-44e9d2e151fb",
      voucherCode: "NEWVOUCHER-2025-001",
      isActive: true,
      updatedAt: "2025-09-13T10:30:00.000Z",
      updatedBy: "admin@muatrans.com"
    },
    Type: "UPDATE_VOUCHER_STATUS"
  }
};

/**
 * Fetcher function to update voucher status
 * @param {string} url - The API endpoint URL with voucherId
 * @param {Object} options - SWR mutation options containing the request body
 * @param {Object} options.arg - The request body
 * @param {boolean} options.arg.isActive - New status for the voucher
 * @returns {Promise} - Axios response promise
 */
export const updateVoucherStatus = async (url, { arg }) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  
  return fetcher.put(url, arg);
};

/**
 * SWR mutation hook for updating voucher status
 * @param {string} voucherId - Required: ID of the voucher to update
 * @returns {Object} - SWR mutation response object { trigger, isMutating, error, data, reset }
 * 
 * Usage:
 * const { trigger, isMutating, error } = useUpdateVoucherStatus(voucherId);
 * 
 * // To update status:
 * await trigger({ isActive: true });
 */
export const useUpdateVoucherStatus = (voucherId) => {
  if (!voucherId) {
    throw new Error("voucherId parameter is required");
  }
  
  const url = `/v1/bo/vouchers/${voucherId}/status`;
  
  return useSWRMutation(
    url,
    updateVoucherStatus,
    {
      // Optimistic updates and error handling can be configured here
      revalidate: true,
    }
  );
};

/**
 * Generic function to update voucher status without hook constraints
 * @param {string} voucherId - Required: ID of the voucher to update
 * @param {boolean} isActive - New status for the voucher
 * @returns {Promise} - Axios response promise
 */
export const updateVoucherStatusById = async (voucherId, isActive) => {
  if (!voucherId) {
    throw new Error("voucherId parameter is required");
  }
  
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = `/v1/bo/vouchers/${voucherId}/status`;
  
  return fetcher.put(url, { isActive });
};