"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
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
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 1,
      limit: 10,
      from: 1,
      to: 1,
    },
  },
  Type: "/v1/tm/buyer_subscription/failed-transactions",
};

export const getFailedTransactions = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  startDate = "",
  endDate = "",
  sort = "DESC",
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

  return useSWR(
    accessToken
      ? `get-failed-transactions?page=${page}&limit=${limit}&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&sort=${sort}`
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
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
