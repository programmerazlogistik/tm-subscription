"use client";

import { useTokenStore, useUserStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = false;

// Mock API result based on the actual API response
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    purchaseHistory: [
      {
        id: "31319950-1f2b-43c4-9c1e-42b8ad87af0b",
        transactionId: "INV/202601/SMP/70305",
        transactionDate: "2026-01-13T11:13:56.992Z",
        packageName: "Paket Silver Baru",
        packageId: "e39ccad9-d02b-4043-bad6-f821422325ae",
        expiresAt: "2026-01-14T11:13:56.983Z",
        additionalMuatkoin: "1200 muatkoin",
        baseMuatkoin: 1200,
        bonusMuatkoin: 0,
        isUnlimited: false,
        price: 9994999,
        currency: "IDR",
        status: "expired",
        statusLabel: "Kedaluwarsa",
        subUsersIncluded: 12,
        packageDetail: {
          name: "Paket Silver Baru",
          price: 9994999,
          promo: {
            id: "49208f12-6926-4428-96c8-79c2b9f648c5",
            discount: 5001,
            bonusMuatkoin: 0,
          },
          period: 30,
          description: "Paket Silver Baru ",
          isUnlimited: false,
          baseMuatkoin: 1200,
          bonusMuatkoin: 0,
          subUsersIncluded: 12,
        },
        paymentMethod: {
          id: "83351a03-b112-4320-b7df-a59d0cd91876",
          name: "BRI Virtual Account",
          code: "bri",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740241479.webp",
          channel: "VA",
          fee: "4440.00",
          feeUnit: "currency",
        },
      },
      {
        id: "48a18ca7-2f91-46be-9aa3-d6613a7149ea",
        transactionId: "INV/202601/SMP/73022",
        transactionDate: "2026-01-13T11:11:07.709Z",
        packageName: "12312321321",
        packageId: "aecf83b2-576f-44a9-baf9-afc37a5926a0",
        expiresAt: "2026-01-14T11:11:07.707Z",
        additionalMuatkoin: "0 muatkoin",
        baseMuatkoin: 0,
        bonusMuatkoin: 0,
        isUnlimited: false,
        price: 12300,
        currency: "IDR",
        status: "expired",
        statusLabel: "Kedaluwarsa",
        subUsersIncluded: 123123,
        packageDetail: {
          name: "12312321321",
          price: 12300,
          promo: null,
          period: 1,
          description: "12312312",
          isUnlimited: false,
          baseMuatkoin: 0,
          bonusMuatkoin: 0,
          subUsersIncluded: 123123,
        },
        paymentMethod: {
          id: "d2aa95f5-6b8e-4272-b922-624234c443a3",
          name: "BCA Virtual Account",
          code: "bca",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          channel: "VA",
          fee: "4440.00",
          feeUnit: "currency",
        },
      },
      {
        id: "6a9c5cec-15b2-4400-a46d-962ab35828b4",
        transactionId: "INV/202601/SMP/62706",
        transactionDate: "2026-01-13T10:49:04.605Z",
        packageName: "Paket Baru Premium Ricky",
        packageId: "61a19c37-2f31-41f6-b0f4-b21dc50aff70",
        expiresAt: "2026-01-14T10:49:04.603Z",
        additionalMuatkoin: "5000 muatkoin",
        baseMuatkoin: 5000,
        bonusMuatkoin: 0,
        isUnlimited: false,
        price: 5000000,
        currency: "IDR",
        status: "expired",
        statusLabel: "Kedaluwarsa",
        subUsersIncluded: 4,
        packageDetail: {
          name: "Paket Baru Premium Ricky",
          price: 5000000,
          promo: null,
          period: 7,
          description: "Paket Baru Premium",
          isUnlimited: false,
          baseMuatkoin: 5000,
          bonusMuatkoin: 0,
          subUsersIncluded: 4,
        },
        paymentMethod: {
          id: "d2aa95f5-6b8e-4272-b922-624234c443a3",
          name: "BCA Virtual Account",
          code: "bca",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          channel: "VA",
          fee: "4440.00",
          feeUnit: "currency",
        },
      },
      {
        id: "02bd69f8-3a0b-43af-b1b4-eb94d58fcb91",
        transactionId: "INV/202601/SMP/54667",
        transactionDate: "2026-01-13T09:34:51.618Z",
        packageName: "Paket Silver Baru",
        packageId: "e39ccad9-d02b-4043-bad6-f821422325ae",
        expiresAt: "2026-01-14T09:34:51.529Z",
        additionalMuatkoin: "1200 muatkoin",
        baseMuatkoin: 1200,
        bonusMuatkoin: 0,
        isUnlimited: false,
        price: 9994999,
        currency: "IDR",
        status: "expired",
        statusLabel: "Kedaluwarsa",
        subUsersIncluded: 12,
        packageDetail: {
          name: "Paket Silver Baru",
          price: 9994999,
          promo: {
            id: "49208f12-6926-4428-96c8-79c2b9f648c5",
            discount: 5001,
            bonusMuatkoin: 0,
          },
          period: 30,
          description: "Paket Silver Baru ",
          isUnlimited: false,
          baseMuatkoin: 1200,
          bonusMuatkoin: 0,
          subUsersIncluded: 12,
        },
        paymentMethod: {
          id: "83351a03-b112-4320-b7df-a59d0cd91876",
          name: "BRI Virtual Account",
          code: "bri",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740241479.webp",
          channel: "VA",
          fee: "4440.00",
          feeUnit: "currency",
        },
      },
      {
        id: "28e3c69e-fa52-4e81-a58f-864e9f07f473",
        transactionId: "INV/202601/SMP/24712",
        transactionDate: "2026-01-12T04:38:35.425Z",
        packageName: "Paket Baru Premium Ricky",
        packageId: "61a19c37-2f31-41f6-b0f4-b21dc50aff70",
        expiresAt: "2026-01-13T04:38:35.409Z",
        additionalMuatkoin: "5000 muatkoin",
        baseMuatkoin: 5000,
        bonusMuatkoin: 0,
        isUnlimited: false,
        price: 5000000,
        currency: "IDR",
        status: "cancelled",
        statusLabel: "Dibatalkan",
        subUsersIncluded: 4,
        packageDetail: {
          name: "Paket Baru Premium Ricky",
          price: 5000000,
          promo: null,
          period: 7,
          description: "Paket Baru Premium",
          isUnlimited: false,
          baseMuatkoin: 5000,
          bonusMuatkoin: 0,
          subUsersIncluded: 4,
        },
        paymentMethod: {
          id: "d2aa95f5-6b8e-4272-b922-624234c443a3",
          name: "BCA Virtual Account",
          code: "bca",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          channel: "VA",
          fee: "4440.00",
          feeUnit: "currency",
        },
      },
    ],
    statusOptions: [
      {
        name: "Dibatalkan",
        value: "cancelled",
      },
      {
        name: "Kedaluwarsa",
        value: "expired",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 5,
      limit: 10,
      from: 1,
      to: 5,
    },
    filters: {
      search: null,
      startDate: null,
      endDate: null,
      status: "expired,cancelled,failed",
      sort: "DESC",
    },
  },
  Type: "/v1/tm/buyer_subscription/failed-transactions?page=1&limit=10&sort=DESC&role=2",
};

export const getFailedTransactions = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  startDate = "",
  endDate = "",
  sort = "DESC",
  role = "",
} = {}) => {
  let result;
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (role) params.append("role", role);

    result = await fetcherTM.get(
      `/v1/tm/buyer_subscription/failed-transactions?${params.toString()}`
    );
  }
  return result.data;
};

export const useGetFailedTransactions = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  startDate = "",
  endDate = "",
  sort = "DESC",
} = {}) => {
  const accessToken = useTokenStore((state) => state.accessToken);
  const role = useUserStore((state) => state.dataUser?.role);

  return useSWR(
    accessToken
      ? `get-failed-transactions?page=${page}&limit=${limit}&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&sort=${sort}&role=${role || ""}`
      : null,
    () =>
      getFailedTransactions({
        page,
        limit,
        search,
        status,
        startDate,
        endDate,
        sort,
        role: role || "",
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
