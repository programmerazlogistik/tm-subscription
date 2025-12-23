import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "OK",
    },
    Data: {
      id: "db5c70a7-143c-4a0f-a392-44e9d2e151fb",
      voucherCode: "NEWVOUCHER-2025-001",
      termsAndConditions:
        "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
      usageInstructions:
        "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
      discountType: "percentage",
      discountValue: "20.00",
      maxDiscountAmount: 100000,
      minTransactionAmount: "500000.00",
      validPeriodStart: "2025-02-01T00:00:00.000Z",
      validPeriodEnd: "2025-12-31T23:59:59.000Z",
      totalQuota: 1001,
      quotaPerUser: 5,
      isActive: false,
      isApplicableForReverseRoute: true,
      pickupLocations: [
        {
          provinceId: "31",
          provinceName: "DKI JAKARTA",
          cities: [
            {
              id: 3171,
              name: "KOTA JAKARTA PUSAT",
            },
            {
              id: 3172,
              name: "KOTA JAKARTA UTARA",
            },
            {
              id: 3173,
              name: "KOTA JAKARTA BARAT",
            },
          ],
        },
        {
          provinceId: "35",
          provinceName: "JAWA TIMUR",
          cities: [
            {
              id: 3571,
              name: "KOTA KEDIRI",
            },
            {
              id: 3572,
              name: "KOTA BLITAR",
            },
          ],
        },
      ],
      deliveryLocations: [
        {
          provinceId: "32",
          provinceName: "JAWA BARAT",
          cities: [
            {
              id: 3201,
              name: "KAB. BOGOR",
            },
            {
              id: 3202,
              name: "KAB. SUKABUMI",
            },
            {
              id: 3203,
              name: "KAB. CIANJUR",
            },
          ],
        },
        {
          provinceId: "35",
          provinceName: "JAWA TIMUR",
          cities: [
            {
              id: 3573,
              name: "KOTA MALANG",
            },
            {
              id: 3574,
              name: "KOTA PROBOLINGGO",
            },
            {
              id: 3575,
              name: "KOTA PASURUAN",
            },
          ],
        },
      ],
      users: [
        {
          id: 568,
          phoneNumber: "088230293892",
          fullName: "Jeff",
        },
        {
          id: 591,
          phoneNumber: "081259406276",
          fullName: "Jojokoko",
        },
        {
          id: 1059,
          phoneNumber: "123412340001",
          fullName: "Andrew Satu",
        },
        {
          id: 1234,
          phoneNumber: "0813654978561",
          fullName: "Sherina",
        },
      ],
      paymentMethods: [
        {
          id: "874df675-a424-4e41-a2b4-07b8c05b6c2f",
          name: "VA",
          institution: "permata",
        },
        {
          id: "1a7097be-a91e-40c9-a181-3b3812e31b0c",
          name: "VA",
          institution: "cimb",
        },
        {
          id: "83351a03-b112-4320-b7df-a59d0cd91876",
          name: "VA",
          institution: "bri",
        },
      ],
      createdAt: "2025-09-09T09:42:26.511Z",
      updatedAt: "2025-09-13T03:50:40.489Z",
    },
    Type: "VOUCHER_DETAIL",
  },
};

/**
 * Fetcher function to get voucher detail by ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getVoucherDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to form values format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for form usage
 */
export const transformVoucherDetailToFormValues = (apiData) => {
  if (!apiData) return {};

  // Parse dates
  const createdDate = new Date(apiData.createdAt);
  const validPeriodStart = new Date(apiData.validPeriodStart);
  const validPeriodEnd = new Date(apiData.validPeriodEnd);

  // Transform pickup locations - store as objects with ID information
  const lokasiMuat =
    apiData.pickupLocations?.flatMap((province) =>
      province.cities.map((city) => ({
        provinceId: province.id || province.provinceId,
        provinceName: province.provinceName || province.name,
        cityId: city.id || city.cityId,
        cityName: city.name || city.cityName,
        label: `${province.provinceName || province.name} - ${city.name || city.cityName}`, // For display
      }))
    ) || [];

  // Transform delivery locations - store as objects with ID information
  const lokasiBongkar =
    apiData.deliveryLocations?.flatMap((province) =>
      province.cities.map((city) => ({
        provinceId: province.id || province.provinceId,
        provinceName: province.provinceName || province.name,
        cityId: city.id || city.cityId,
        cityName: city.name || city.cityName,
        label: `${province.provinceName || province.name} - ${city.name || city.cityName}`, // For display
      }))
    ) || [];

  // Transform users to WhatsApp format
  // Handle "all" case from backend
  const userWhatsApp = (() => {
    // If backend returns "all" string, set a special indicator
    if (
      (typeof apiData.users === "string" &&
        apiData.users.toLowerCase() === "all") ||
      (typeof apiData.userWhatsApp === "string" &&
        apiData.userWhatsApp.toLowerCase() === "all")
    ) {
      return [
        {
          value: "all",
          label: "Semua User",
          isAllSelected: true,
        },
      ];
    }

    // Otherwise, transform individual users
    return (
      apiData.users?.map((user) => ({
        value: user.id,
        label: user.phoneNumber,
        fullName: user.fullName,
        email: user.email,
        id: user.id,
      })) || []
    );
  })();

  // Transform payment methods
  const metodeInstansiTujuanPembayaran = (() => {
    // If backend returns "all" string, set a special indicator
    if (
      (typeof apiData.paymentMethods === "string" &&
        apiData.paymentMethods.toLowerCase() === "all") ||
      (typeof apiData.metodeInstansiTujuanPembayaran === "string" &&
        apiData.metodeInstansiTujuanPembayaran.toLowerCase() === "all")
    ) {
      return [
        {
          value: "all",
          label: "Semua Metode Pembayaran",
          isAllSelected: true,
        },
      ];
    }

    // Otherwise, transform individual payment methods
    return (
      apiData.paymentMethods?.map((method) => ({
        value: method.id,
        label: `${method.name} - ${method.institution.toUpperCase()}`,
      })) || []
    );
  })();

  return {
    tanggalPembuatan: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    kodeVoucher: apiData.voucherCode || "",
    syaratDanKetentuan: apiData.termsAndConditions || "",
    caraPemakaian: apiData.usageInstructions || "",
    jenisPotongan: apiData.discountType === "percentage" ? "x %" : "Rp x",
    nominal: apiData.discountValue || "",
    maksimalPotonganRp: apiData.maxDiscountAmount
      ? apiData.maxDiscountAmount.toString()
      : "",
    minimalTransaksiRp: apiData.minTransactionAmount || "",
    periodeAwal: validPeriodStart.toISOString().split("T")[0], // YYYY-MM-DD format
    periodeAkhir: validPeriodEnd.toISOString().split("T")[0], // YYYY-MM-DD format
    kuotaVoucher: apiData.totalQuota ? apiData.totalQuota.toString() : "",
    kuotaPerUser: apiData.quotaPerUser ? apiData.quotaPerUser.toString() : "",
    userWhatsApp,
    metodeInstansiTujuanPembayaran,
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    lokasiMuat,
    lokasiBongkar,
    berlakuRuteSebaliknya: apiData.isApplicableForReverseRoute || false,
  };
};

/**
 * SWR hook for fetching voucher detail
 * @param {string} voucherId - Required: ID of the voucher to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVoucherDetail = (voucherId, options = {}) => {
  if (!voucherId) {
    throw new Error("voucherId parameter is required");
  }

  const cacheKey = `/v1/bo/vouchers/${voucherId}`;

  return useSWR(cacheKey, getVoucherDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};
