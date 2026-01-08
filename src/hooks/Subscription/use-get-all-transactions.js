"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = false;

// Mock API result
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    transactions: [
      {
        id: "91d69539-b37d-4150-ad6b-35fd92981cf3",
        type: "purchase",
        transactionId: "INV/202601/SMP/55368",
        date: "2026-01-06T06:26:23.830Z",
        description: "Pembelian Paket coba sekali lagi di ubah",
        amount: 8,
        muatkoinChange: 550,
        status: "paid",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 1,
      limit: 10,
    },
  },
  Type: "/v1/tm/buyer_subscription/all-transactions?type=purchase&page=1&limit=10",
};

export const getAllTransactions = async ({
  type = "purchase",
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  let result;
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    result = await fetcherTM.get(
      `/v1/tm/buyer_subscription/all-transactions?type=${type}&page=${page}&limit=${limit}${searchParam}`
    );
  }
  return result.data;
};

export const useGetAllTransactions = ({
  type = "purchase",
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken
      ? `get-all-transactions?type=${type}&page=${page}&limit=${limit}&search=${search}`
      : null,
    () => getAllTransactions({ type, page, limit, search }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
