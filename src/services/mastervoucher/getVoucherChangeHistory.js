import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "OK",
    },
    Data: {
      data: [
        {
          paymentMethods: [
            {
              id: "874df675-a424-4e41-a2b4-07b8c05b6c2f",
              nama: "Permata Virtual Account",
            },
            {
              id: "1a7097be-a91e-40c9-a181-3b3812e31b0c",
              nama: "CIMB Virtual Account",
            },
            {
              id: "83351a03-b112-4320-b7df-a59d0cd91876",
              nama: "BRI Virtual Account",
            },
          ],
          waktuUpdate: "2025-09-09T09:43:16.845Z",
          aktivitas: "updated",
          user: {
            id: "ec04a097-5ef1-4b42-a92e-28e4783a36f7",
            nama: null,
            email: null,
          },
          syaratDanKetentuan:
            "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
          caraPemakaian:
            "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
          periodeWaktu: {
            mulai: "2025-02-01T00:00:00.000Z",
            berakhir: "2025-12-31T23:59:59.000Z",
          },
          users: [
            { id: null, nomorTelepon: "Unknown" },
            { id: null, nomorTelepon: "Unknown" },
            { id: null, nomorTelepon: "Unknown" },
            { id: null, nomorTelepon: "Unknown" },
          ],
          kuotaVoucher: 1001,
          kuotaUser: 5,
          lokasiMuatDanBongkar: {
            muat: [
              {
                cities: [
                  { id: 3101, city: "KAB. ADM. KEP. SERIBU" },
                  { id: 3173, city: "KOTA JAKARTA BARAT" },
                  { id: 3171, city: "KOTA JAKARTA PUSAT" },
                  { id: 3174, city: "KOTA JAKARTA SELATAN" },
                  { id: 3175, city: "KOTA JAKARTA TIMUR" },
                  { id: 3172, city: "KOTA JAKARTA UTARA" },
                ],
                provinceId: "31",
                provinceName: "DKI JAKARTA",
              },
            ],
            bongkar: [
              {
                cities: [
                  { id: 3402, city: "KAB. BANTUL" },
                  { id: 3403, city: "KAB. GUNUNGKIDUL" },
                  { id: 3401, city: "KAB. KULON PROGO" },
                  { id: 3404, city: "KAB. SLEMAN" },
                  { id: 3471, city: "KOTA YOGYAKARTA" },
                ],
                provinceId: "34",
                provinceName: "DAERAH ISTIMEWA YOGYAKARTA",
              },
            ],
          },
          status: "active",
          changeDetails: {
            id: "aeb8f898-a1f2-4a2d-90cf-1f2120f44864",
            fieldName: null,
            oldValue: "...",
            newValue: "...",
          },
        },
        {
          paymentMethods: [
            {
              id: "874df675-a424-4e41-a2b4-07b8c05b6c2f",
              nama: "Permata Virtual Account",
            },
            {
              id: "1a7097be-a91e-40c9-a181-3b3812e31b0c",
              nama: "CIMB Virtual Account",
            },
            {
              id: "83351a03-b112-4320-b7df-a59d0cd91876",
              nama: "BRI Virtual Account",
            },
          ],
          waktuUpdate: "2025-09-09T09:42:27.067Z",
          aktivitas: "created",
          user: {
            id: "ec04a097-5ef1-4b42-a92e-28e4783a36f7",
            nama: null,
            email: null,
          },
          syaratDanKetentuan:
            "Voucher berlaku untuk semua pengguna terdaftar. Tidak dapat digabungkan dengan promosi lain. Berlaku selama periode yang ditentukan.",
          caraPemakaian:
            "Masukkan kode voucher pada halaman checkout sebelum melakukan pembayaran untuk mendapatkan diskon otomatis",
          periodeWaktu: {
            mulai: "2025-02-01T00:00:00.000Z",
            berakhir: "2025-12-31T23:59:59.000Z",
          },
          users: [
            { id: null, nomorTelepon: null },
            { id: null, nomorTelepon: null },
            { id: null, nomorTelepon: null },
            { id: null, nomorTelepon: null },
          ],
          kuotaVoucher: 1000,
          kuotaUser: 5,
          lokasiMuatDanBongkar: {
            muat: [
              {
                cities: [
                  { id: 3101, city: "KAB. ADM. KEP. SERIBU" },
                  { id: 3173, city: "KOTA JAKARTA BARAT" },
                  { id: 3171, city: "KOTA JAKARTA PUSAT" },
                  { id: 3174, city: "KOTA JAKARTA SELATAN" },
                  { id: 3175, city: "KOTA JAKARTA TIMUR" },
                  { id: 3172, city: "KOTA JAKARTA UTARA" },
                ],
                provinceId: "31",
                provinceName: "DKI JAKARTA",
              },
            ],
            bongkar: [
              {
                cities: [
                  { id: 3402, city: "KAB. BANTUL" },
                  { id: 3403, city: "KAB. GUNUNGKIDUL" },
                  { id: 3401, city: "KAB. KULON PROGO" },
                  { id: 3404, city: "KAB. SLEMAN" },
                  { id: 3471, city: "KOTA YOGYAKARTA" },
                ],
                provinceId: "34",
                provinceName: "DAERAH ISTIMEWA YOGYAKARTA",
              },
            ],
          },
          status: "active",
          changeDetails: {
            id: "305671c5-1202-448a-b1a2-df4b669c8d1a",
            fieldName: null,
            oldValue: null,
            newValue: "...",
          },
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    },
    Type: "/v1/bo/vouchers/db5c70a7-143c-4a0f-a392-44e9d2e151fb/history/changes",
  },
};

// Mapping function to match mock data structure
function mapApiToMockStructure(item, idx = 0) {
  return {
    id: item.id || idx + 1,
    updateTime: item.waktuUpdate
      ? new Date(item.waktuUpdate).toLocaleDateString("id-ID")
      : item.updateTime || "",
    updateDate: item.waktuUpdate
      ? `${new Date(item.waktuUpdate).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`
      : item.updateDate || "",
    activity: item.aktivitas || item.activity || "",
    user:
      typeof item.user === "string"
        ? item.user
        : item.user?.nama || item.user?.name || item.user?.email || "Unknown",
    termsConditions:
      item.syaratDanKetentuan ||
      item.termsConditions ||
      item.termsAndConditions ||
      "",
    paymentMethods: item.caraPemakaian || item.paymentMethods || "",
    validPeriod: item.periodeWaktu
      ? {
          start: item.periodeWaktu.mulai
            ? new Date(item.periodeWaktu.mulai).toLocaleDateString("id-ID")
            : "",
          end: item.periodeWaktu.berakhir
            ? new Date(item.periodeWaktu.berakhir).toLocaleDateString("id-ID")
            : "",
        }
      : item.validPeriod || { start: "", end: "" },
    userType:
      item.users && Array.isArray(item.users)
        ? item.users.map((u) => ({
            label: u.nomorTelepon || "Unknown",
            value: u.nomorTelepon || "Unknown",
          }))
        : item.userType || [],
    quota: item.kuotaVoucher?.toLocaleString("id-ID") || item.quota || "",
    quotaPerUser: item.kuotaUser?.toString() || item.quotaPerUser || "",
    paymentInstallment: item.paymentInstallment || [
      { label: "Transfer Virtual Account - ECA", value: "va-eca" },
      { label: "Transfer Virtual Account - Mandiri", value: "va-mandiri" },
      { label: "Transfer Virtual Account - Danamon", value: "va-danamon" },
      { label: "Transfer Virtual Account - BRI", value: "va-bri" },
      { label: "Transfer Virtual Account - BNI", value: "va-bni" },
      { label: "Transfer Virtual Account - BCA", value: "va-bca" },
      { label: "Credit Card", value: "cc" },
      { label: "OVO", value: "ovo" },
    ],
    location:
      item.lokasiMuatDanBongkar?.muat?.flatMap((loc) =>
        loc.cities.map((city) => ({
          label: `${loc.provinceName || loc.provinceId} - ${city.city}`,
          value: `${loc.provinceId}-${city.id}`,
        }))
      ) ||
      item.location ||
      [],
    originLocation:
      item.lokasiMuatDanBongkar?.bongkar?.flatMap((loc) =>
        loc.cities.map((city) => ({
          label: `${loc.provinceName || loc.provinceId} - ${city.city}`,
          value: `${loc.provinceId}-${city.id}`,
        }))
      ) ||
      item.originLocation ||
      [],
    status: item.status === "active" ? "Aktif" : "Tidak Aktif" || "",
    isAllPaymentMethod: item.isAllPaymentMethod || false,
    isAllUser: item.isAllUser || false,
  };
}

export const getVoucherChangeHistory = async (
  voucherId,
  params = {},
  useFetcherMuatrans = false
) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const query = new URLSearchParams(params).toString();
  const url = `/v1/bo/vouchers/${voucherId}/history/changes${query ? `?${query}` : ""}`;
  const res = await fetcher.get(url);
  // Map data to mock structure
  if (res.data?.Data?.data) {
    res.data.Data.data = res.data.Data.data.map((item, idx) =>
      mapApiToMockStructure(item, idx)
    );
  }
  return res.data;
};

export const useGetVoucherChangeHistory = (
  voucherId,
  params = {},
  useFetcherMuatrans = false
) => {
  const key = voucherId
    ? [
        `/v1/bo/vouchers/${voucherId}/history/changes`,
        params,
        useFetcherMuatrans,
      ]
    : null;
  return useSWR(key, () =>
    getVoucherChangeHistory(voucherId, params, useFetcherMuatrans)
  );
};
