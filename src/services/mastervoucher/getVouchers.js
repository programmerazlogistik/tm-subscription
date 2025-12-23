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
          id: "db5c70a7-143c-4a0f-a392-44e9d2e151fb",
          voucherCode: "NEWVOUCHER-2025-001",
          status: "Aktif",
          isActive: true,
          isExpired: false,
          createdAt: "2025-09-09T09:42:26.511Z",
          creationDate: "2025-09-09T09:42:26.511Z",
          validPeriodStart: "2025-02-01T00:00:00.000Z",
          validPeriodEnd: "2025-12-31T23:59:59.000Z",
          periodDisplay: "01/02/2025 - 01/01/2026",
          discountType: "percentage",
          discountValue: "20.00",
          discountDisplay: "20.00%",
          maxDiscountAmount: 100000,
          maxDiscountDisplay: "Rp 100.000",
          totalQuota: 1001,
          remainingQuota: 1001,
          quotaDisplay: "0/1001",
          totalClaimed: 0,
          uniqueUsers: 0,
          totalClaimValue: 0,
          totalClaimValueDisplay: "Rp 0",
          termsAndConditions:
            "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
          usageInstructions:
            "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
          minTransactionAmount: "500000.00",
          updatedAt: "2025-09-09T09:43:16.501Z",
        },
        {
          id: "fd2fd22a-697d-46ae-8916-b65fcbf1eac1",
          voucherCode: "COMPLETE-VOUCHER-002",
          status: "Aktif",
          isActive: true,
          isExpired: false,
          createdAt: "2025-09-06T07:37:00.166Z",
          creationDate: "2025-09-06T07:37:00.166Z",
          validPeriodStart: "2025-01-01T00:00:00.000Z",
          validPeriodEnd: "2025-12-31T23:59:59.000Z",
          periodDisplay: "01/01/2025 - 01/01/2026",
          discountType: "percentage",
          discountValue: "15.00",
          discountDisplay: "15.00%",
          maxDiscountAmount: 75000,
          maxDiscountDisplay: "Rp 75.000",
          totalQuota: 500,
          remainingQuota: 500,
          quotaDisplay: "0/500",
          totalClaimed: 0,
          uniqueUsers: 0,
          totalClaimValue: 0,
          totalClaimValueDisplay: "Rp 0",
          termsAndConditions:
            "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
          usageInstructions:
            "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
          minTransactionAmount: "250000.00",
          updatedAt: "2025-09-06T07:37:00.166Z",
        },
        {
          id: "71b8881a-66ff-454d-a0c6-66b26b84628e",
          voucherCode: "DISCOUNT75",
          status: "Aktif",
          isActive: true,
          isExpired: false,
          createdAt: "2025-07-25T03:17:11.084Z",
          creationDate: "2025-07-25T03:17:11.084Z",
          validPeriodStart: "2025-01-15T00:00:00.000Z",
          validPeriodEnd: "2025-12-31T23:59:59.000Z",
          periodDisplay: "15/01/2025 - 01/01/2026",
          discountType: "percentage",
          discountValue: "75.00",
          discountDisplay: "75.00%",
          maxDiscountAmount: 150000,
          maxDiscountDisplay: "Rp 150.000",
          totalQuota: 50,
          remainingQuota: 50,
          quotaDisplay: "0/50",
          totalClaimed: 0,
          uniqueUsers: 0,
          totalClaimValue: 0,
          totalClaimValueDisplay: "Rp 0",
          termsAndConditions: "Berlaku untuk semua jenis layanan - Updated",
          usageInstructions: "Masukkan kode voucher saat checkout - Updated",
          minTransactionAmount: "750000.00",
          updatedAt: "2025-09-08T07:43:27.732Z",
        },
        {
          id: "71b8881a-66ff-454d-a0c6-66b26b84628d",
          voucherCode: "COMPLETE-VOUCHER-001",
          status: "Aktif",
          isActive: true,
          isExpired: false,
          createdAt: "2025-07-25T03:15:28.414Z",
          creationDate: "2025-07-25T03:15:28.414Z",
          validPeriodStart: "2025-01-01T00:00:00.000Z",
          validPeriodEnd: "2025-12-31T23:59:59.000Z",
          periodDisplay: "01/01/2025 - 01/01/2026",
          discountType: "percentage",
          discountValue: "15.00",
          discountDisplay: "15.00%",
          maxDiscountAmount: 75000,
          maxDiscountDisplay: "Rp 75.000",
          totalQuota: 500,
          remainingQuota: 500,
          quotaDisplay: "0/500",
          totalClaimed: 0,
          uniqueUsers: 0,
          totalClaimValue: 0,
          totalClaimValueDisplay: "Rp 0",
          termsAndConditions:
            "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
          usageInstructions:
            "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
          minTransactionAmount: "250000.00",
          updatedAt: "2025-09-06T07:36:40.590Z",
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 4,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    },
    Type: "/v1/bo/vouchers",
  },
};

/**
 * Fetcher function to get vouchers with search, filtering, pagination, and sorting
 * @param {string} url - The API endpoint URL
 * @param {Object} params - Query parameters for the API call
 * @returns {Promise} - Axios response promise
 */
export const getVouchers = async (url, params = {}) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;

  // Build query string from params
  const queryParams = new URLSearchParams();

  // Add each parameter to the query string if it has a value
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        // Handle array parameters (for filters like is_active, jenis_diskon)
        value.forEach((v) => queryParams.append(key, v));
      } else {
        // Convert sortOrder to uppercase as required by API
        if (key === "sortOrder" && typeof value === "string") {
          value = value.toUpperCase();
        }
        queryParams.set(key, value);
      }
    }
  });

  const queryString = queryParams.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return fetcher.get(finalUrl);
};

/**
 * SWR hook for fetching vouchers
 * @param {Object} params - API parameters
 * @param {boolean} params.is_expired - Required: Status kedaluwarsa voucher
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.sortBy - Field for sorting: createdAt, voucherCode, discountValue, totalQuota, validPeriodStart, validPeriodEnd, isActive (default: createdAt)
 * @param {string} params.sortOrder - Sort direction: ASC/DESC (default: DESC)
 * @param {string} params.search - Search term for voucher code
 * @param {boolean[]} params.is_active - Filter status aktif (only for !expired)
 * @param {string[]} params.jenis_diskon - Jenis diskon: "fixed", "percentage"
 * @param {number} params.range_diskon_min - Nilai diskon minimum
 * @param {number} params.range_diskon_max - Nilai diskon maksimum
 * @param {number} params.minimum_pembelian_min - Minimum transaksi minimum
 * @param {number} params.minimum_pembelian_max - Minimum transaksi maksimum
 * @param {number} params.kuota_voucher_min - Kuota minimum
 * @param {number} params.kuota_voucher_max - Kuota maksimum
 * @param {number} params.sisa_kuota_min - Sisa kuota minimum
 * @param {number} params.sisa_kuota_max - Sisa kuota maksimum
 * @param {number} params.total_nilai_klaim_min - Total klaim minimum
 * @param {number} params.total_nilai_klaim_max - Total klaim maksimum
 * @param {string} params.masa_berlaku_dari - Filter periode awal (ISO date)
 * @param {string} params.masa_berlaku_sampai - Filter periode akhir (ISO date)
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVouchers = (params = {}, options = {}) => {
  // Ensure is_expired is provided as it's required
  if (params.is_expired === undefined || params.is_expired === null) {
    throw new Error("is_expired parameter is required");
  }

  // Create cache key that includes all parameters
  const cacheKey = ["/v1/bo/vouchers", params];

  return useSWR(
    cacheKey,
    ([url, queryParams]) => getVouchers(url, queryParams),
    {
      // Default SWR options
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...options,
    }
  );
};
