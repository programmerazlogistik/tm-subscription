"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = false;

// Mock API result based on docs/api/subscription/transaction/usage-history.md
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    usageHistory: [
      // {
      //   id: "7b8a8822-09d9-4ac2-ab6a-d5291458ac58",
      //   usageDate: "2026-01-12T07:52:52.323Z",
      //   userModule: "Transporter",
      //   purchaseId: "91d69539-b37d-4150-ad6b-35fd92981cf3",
      //   transactionId: "INV/202601/SMP/55368",
      //   moduleType: "transporter",
      //   usageType: "view_bid_detail_participate",
      //   reference: "752",
      //   description:
      //     "Deduction for view_bid_detail_participate - Reference: 752",
      //   opponentCompanyName: "Transporter Jerrie",
      //   muatkoinAmount: -100,
      //   isPositive: false,
      //   packageName: "coba sekali lagi di ubah",
      //   packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
      // },
      // {
      //   id: "feabac0c-a3bf-4bea-be95-630ea45ba569",
      //   usageDate: "2026-01-12T07:41:03.733Z",
      //   userModule: "Top Up muatkoin",
      //   purchaseId: "4f5dabe0-9ba3-4ce0-8b71-13873f97c99d",
      //   transactionId: "INV/202601/SMP/97024",
      //   moduleType: "purchase",
      //   usageType: "top_up",
      //   reference: "INV/202601/SMP/97024",
      //   description: "Top Up muatkoin Paket Platinum",
      //   opponentCompanyName: null,
      //   muatkoinAmount: 500,
      //   isPositive: true,
      //   packageName: "Platinum",
      //   packageId: "6476acbf-56f3-45af-808f-40140f6797fa",
      // },
      // {
      //   id: "635b9965-ed9b-4a78-99f7-2bdd35d8ca99",
      //   usageDate: "2026-01-06T15:23:35.092Z",
      //   userModule: "Shipper",
      //   purchaseId: "91d69539-b37d-4150-ad6b-35fd92981cf3",
      //   transactionId: "INV/202601/SMP/55368",
      //   moduleType: "shipper",
      //   usageType: "view_bid_participant",
      //   reference: "754",
      //   description: "Deduction for view_bid_participant - Reference: 754",
      //   opponentCompanyName: "XXX",
      //   muatkoinAmount: -50,
      //   isPositive: false,
      //   packageName: "coba sekali lagi di ubah",
      //   packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
      // },
      // {
      //   id: "446c6b52-d6e4-4dd7-a925-f23e2c9ac2d3",
      //   usageDate: "2026-01-06T10:54:42.664Z",
      //   userModule: "Transporter",
      //   purchaseId: "91d69539-b37d-4150-ad6b-35fd92981cf3",
      //   transactionId: "INV/202601/SMP/55368",
      //   moduleType: "transporter",
      //   usageType: "view_bid_detail_participate",
      //   reference: "754",
      //   description:
      //     "Deduction for view_bid_detail_participate - Reference: 754",
      //   opponentCompanyName: "XXX",
      //   muatkoinAmount: -100,
      //   isPositive: false,
      //   packageName: "coba sekali lagi di ubah",
      //   packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
      // },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 4,
      limit: 10,
      from: 1,
      to: 4,
    },
    filters: {
      search: null,
      period: "all",
      startDate: null,
      endDate: null,
      usageType: null,
    },
  },
  Type: "/v1/tm/buyer_subscription/usage-history?period=all&page=1&limit=10",
};

export const getUsageHistory = async ({
  period = "all",
  page = 1,
  limit = 10,
  search = "",
  usageType = "",
  startDate = "",
  endDate = "",
} = {}) => {
  let result;
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const usageTypeParam = usageType
      ? `&usageType=${encodeURIComponent(usageType)}`
      : "";
    const startDateParam = startDate
      ? `&startDate=${encodeURIComponent(startDate)}`
      : "";
    const endDateParam = endDate
      ? `&endDate=${encodeURIComponent(endDate)}`
      : "";
    result = await fetcherTM.get(
      `/v1/tm/buyer_subscription/usage-history?period=${period}&page=${page}&limit=${limit}${searchParam}${usageTypeParam}${startDateParam}${endDateParam}`
    );
  }
  return result.data;
};

export const useGetUsageHistory = ({
  period = "all",
  page = 1,
  limit = 10,
  search = "",
  usageType = "",
  startDate = "",
  endDate = "",
} = {}) => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken
      ? `get-usage-history?period=${period}&page=${page}&limit=${limit}&search=${search}&usageType=${usageType}&startDate=${startDate}&endDate=${endDate}`
      : null,
    () =>
      getUsageHistory({
        period,
        page,
        limit,
        search,
        usageType,
        startDate,
        endDate,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
